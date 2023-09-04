import mongoose from "mongoose";

const credentials = new mongoose.Schema({
  username: String,
  password: String,
  friends: String,
  refreshtoken: String,
});

var usermod = mongoose.models.user || mongoose.model("user", credentials);
const rooms = new mongoose.Schema({
  roomname: String,
  password: String,
});
var room = mongoose.models.rooms || mongoose.model("rooms", rooms);
export { room };
export default usermod;
