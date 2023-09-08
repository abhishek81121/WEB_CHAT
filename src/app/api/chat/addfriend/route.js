import usermod from "@/app/model/model";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import firebase_app from "@/firebase/config";
import { getDatabase, ref, set } from "firebase/database";
export async function POST(req) {
  const info = await req.json();
  var flag = "User Not Found";
  let ans;

  const username = cookies().get("username").value;
  const friendname = info.friendname;
  await mongoose.connect(process.env.DB_URI);
  const data = await usermod.findOne({ username: friendname });
  const user = await usermod.findOne({ username: username });
  if (data) {
    flag = "Cannot Make Yourself A Friend";
    if (friendname != username) {
      var friendarr;
      if (user.freinds != "") friendarr = user.friends.split(",");
      else friendarr = [];
      for (var i = 0; i < friendarr.length; i++) {
        if (friendname == friendarr[i]) {
          flag = "Already Friends";
        }
      }
      if (flag != "Already Friends") {
        flag = "Friend Added";
        console.log(data);
        if (user.friends != "") {
          ans = user.friends + "," + friendname;
        } else {
          ans = friendname;
        }
      }
      if (flag == "Friend Added") {
        await usermod.updateOne({ username: username }, { friends: ans });
        ans = await usermod.findOne({ username: friendname });
        ans = ans.friends;
        if (ans == "")
          await usermod.updateOne(
            { username: friendname },
            { friends: username }
          );
        else {
          ans = ans + "," + username;
          await usermod.updateOne({ username: friendname }, { friends: ans });
        }
      }
    }
  }
  return NextResponse.json({ status: flag });
}
