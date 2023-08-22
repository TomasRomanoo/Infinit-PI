import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
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

  const {
  firstName,
  lastName,
  phone,
  email,
  identification,
  password,
  address,
  city,
  country,
  zipCode,
} = body;

// const {  ,  street } = address;


const hashedPassword = await bcrypt.hash(password, 10);

const result = await prisma.user.create({
  data: {
    first_name: firstName,
    last_name: lastName,
    phone: parseInt(phone),
    email,
    identification,
    password: hashedPassword,
    address, // Assign street to the correct field
    city,
    country,
    zip_code: parseInt(zipCode),
    role: {
      connect: { idrole: 2 },
    },
    deleted: 0, // Assuming deleted is a boolean field
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

    return  NextResponse.json({
      message: "User registered successfully",
    });
    
  }

