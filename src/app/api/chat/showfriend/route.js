import usermod from "@/app/model/model";
import mongoose, { mongo } from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const username = cookies().get("username").value;
  await mongoose.connect(process.env.DB_URI);
  const data = await usermod.findOne({ username: username });
  const ans = data.friends;
  return NextResponse.json({ ans });
}
