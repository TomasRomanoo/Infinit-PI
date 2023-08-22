import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const {
    firstName,
    lastName,
    address,
    city,
    country,
    zipCode,
    identification,
    phone,
    email,
    password,
  } = body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.log("entra aca");
    return NextResponse.json(
      {
        message: "There is already a user with that email",
      },
      {
        status: 400,
      }
    );
  } else {
    console.log("entra aca x2");

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        address,
        city,
        country,
        zip_code: zipCode,
        identification,
        password: hashedPassword,
        role: {
          connect: { idrole: 2 },
        },
      },
    });

    const Email = {
      from: "noreply@grupo3.com",
      to: email,
      subject: "Confirmation of sign up",
      text: `Hi ${firstName}, thank you for signing up for our app. Please click the link below to confirm your email address.`,
      html: `<strong>Hi ${firstName}, thank you for signing up for our app. Please click the link below to confirm your email address.</strong>`,
      attachments: [
        {
          filename: "log.jpg",
          path: "../assets/images/blue-car.jpg",
        },
      ],
    };
    transporter.sendMail(Email);

    return NextResponse.json({
      message: "User registered successfully",
    });
  }
}
