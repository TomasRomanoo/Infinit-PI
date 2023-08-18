import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../database";

export async function POST(request) {
  const { email, password } = await request.json();

  // Obtener el usuario de la base de datos
  const user = await getUserByEmail(email);

  // Verificar si el usuario existe y si la contraseña es correcta
  if (user && bcrypt.compareSync(password, user.password)) {
    
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1,
        email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET
    );

    const response = NextResponse.json({
      token,
      isAdmin: user.isAdmin,
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 1,
      path: "/",
    });

    return response;
  } else {
    return NextResponse.json(
      {
        message: "Credenciales inválidas",
      },
      {
        status: 401,
      }
    );
  }
}

