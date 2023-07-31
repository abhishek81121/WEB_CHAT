import usermod from "@/app/model/model";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
export async function POST(request, response) {
  const info = await request.json();
  const username = info.username.slice(0, -9);
  const password = info.password;
  var flag = 0;
  try {
    await mongoose.connect(process.env.DB_URI);
    const data = await usermod.findOne({ username: username });
    console.log(data);
    if (data) {
      let promise = await new Promise((resolve, reject) => {
        bcrypt.compare(password, data.password, (err, res) => {
          if (res === true) {
            flag = 1;
            const accesstoken = jwt.sign(
              { username: username },
              process.env.ACCESS_SECRET,
              {
                expiresIn: "15m",
              }
            );
            cookies().set("accesstoken", accesstoken, {
              httpOnly: true,
              sameSite: true,
              secure: true,
            });
            cookies().set(
              "refreshtoken",
              jwt.sign({ username: username }, process.env.REFRESH_SECRET, {
                expiresIn: "1d",
              }),
              { httpOnly: true, sameSite: true, secure: true }
            );
            resolve("ok");
          } else {
            reject("error");
          }
        });
      });
    }
    console.log(flag);
    if (flag == 0) return NextResponse.json({ status: "false" });
    else return NextResponse.json({ status: "true" });
  } catch (err) {
    return NextResponse.json({ status: "false" });
  }
}
