import usermod from "@/app/model/model";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req) {
  const info = await req.json();
  console.log(info);
  var flag = "user not found";
  let ans;
  const username = cookies().get("username").value;
  const friendname = info.friendname;
  await mongoose.connect(process.env.DB_URI);
  const data = await usermod.findOne({ username: friendname });
  if (data) {
    flag = "cannot make yourself a friend";
    if (friendname != username) {
      var friendarr;
      if (data.freinds != null) friendarr = data.friends.split(",");
      else friendarr = [];
      for (var i = 0; i < friendarr.length; i++) {
        if (friendname == friendarr[i]) {
          flag = "already friends";
        }
      }
      if (flag != "already friends") {
        flag = "friend added";

        if (data.friends != null) {
          ans = data.friends + "," + friendname;
        } else {
          ans = friendname;
        }
      }
      if (flag == "friend added") {
        await usermod.updateOne({ username: username }, { friends: ans });
        ans = await usermod.findOne({ username: friendname });
        console.log(ans);
        ans = ans.friends;
        if (ans == null)
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
