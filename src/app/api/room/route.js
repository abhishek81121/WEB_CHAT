import { room } from "@/app/model/model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function POST(request) {
  const info = await request.json();
  const roomname = info.roomname;
  const password = info.password;
  await mongoose.connect(process.env.DB_URI);
  if (!(await room.findOne({ roomname: roomname }))) {
    const roomu = new room({
      roomname: roomname,
      password: password,
    });
    await roomu.save();
    return NextResponse.json({ status: "true" });
  } else {
    return NextResponse.json({ status: "false" });
  }
}
