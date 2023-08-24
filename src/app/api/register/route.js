import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  const body = await request.json();

  const {
    firstName,
    lastName,
    address,
    identification,
    phone,
    email,
    password,
  } = body;

  const { country, city, zipCode, street } = address;

  console.log("body", body);

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      {
        message: "There is already a user with that email",
      },
      {
        status: 400,
      }
    );
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: parseInt(phone),
        email,
        address: street,
        country,
        city,
        zip_code: parseInt(zipCode),
        identification,
        password: hashedPassword,
        role: {
          connect: { idrole: 2 },
        },
        deleted: false,
      },
    });


    const emailOptions = {
      from: "noreply@example.com",
      to: email,
      subject: "Confirmation of sign up",
      text: `Hi ${firstName}, thank you for signing up for our app. Please click the link below to confirm your email address.`,
      html: `<strong>Hi ${firstName}, thank you for signing up for our app. Please click the link below to confirm your email address.</strong>`,
    };

    try {
      await transporter.sendMail(emailOptions);
      console.log("Registration confirmation email sent");
    } catch (error) {
      console.error("Error sending registration confirmation email:", error);
    }

    return NextResponse.json({
      message: "User registered successfully",
      user: newUser,
    });
  }
}