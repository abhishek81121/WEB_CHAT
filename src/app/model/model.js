import mongoose from "mongoose";

const credentials = new mongoose.Schema({
  username: String,
  password: String,
  accesstoken: String,
});

var usermod = mongoose.models.user || mongoose.model("user", credentials);
export default usermod;
