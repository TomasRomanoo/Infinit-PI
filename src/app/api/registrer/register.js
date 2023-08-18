import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Crear un transportador de Nodemailer utilizando SMTP u otro mecanismo de transporte
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  const { name, email, password } = await request.json();

  // Verificar si ya existe un usuario con el mismo correo electrónico
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    // Si ya existe un usuario con el mismo correo electrónico, enviar un mensaje de error
    return NextResponse.json(
      {
        message: "Ya existe un usuario con ese correo electrónico",
      },
      {
        status: 400,
      }
    );
  } else {
    // Si no existe un usuario con el mismo correo electrónico, crear uno nuevo
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Enviar correo electrónico de confirmación
    const Email = {
      from: "noreply@grupo3.com",
      to: email,
      subject: "Confirmación de registro",
      text: `Hola ${name}, gracias por registrarte en nuestra aplicación. Por favor, haz clic en el siguiente enlace para confirmar tu dirección de correo electrónico.`,
      html: `<strong>Hola ${name}, gracias por registrarte en nuestra aplicación. Por favor, haz clic en el siguiente enlace para confirmar tu dirección de correo electrónico.</strong>`,
      attachments: [
        {
          filename: "log.jpg",
          path: "../assets/images/blue-car.jpg",//completar con ruta a la imagen
        },
      ],
    };
    transporter.sendMail(Email);

    return NextResponse.json({
      message: "Usuario registrado con éxito",
    });
  }
}
