import usermod from "@/app/model/model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const info = await request.json();
  const username = info.username.slice(0, -9);
  const password = info.password;
  await mongoose.connect(process.env.DB_URI);
  if (!(await usermod.findOne({ username: username }))) {
    var user = new usermod({
      username: username,
      password: password,
      refreshtoken: null,
    });
    await user.save();
    return NextResponse.json({ status: "true" });
  } else {
    return NextResponse.json({ status: "false" });
  }
}
