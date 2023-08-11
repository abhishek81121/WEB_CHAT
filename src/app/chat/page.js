"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import axios from "axios";
export default function chat() {
  const [visible, setVisible] = useState("none");
  const [btntxt, setBtntxt] = useState("Create Room");
  const [roomname, setRoomname] = useState("");
  const [password, setPassword] = useState("");
  async function createuser() {
    axios
      .post("/api/room", {
        roomname: roomname,
        password: password,
      })
      .then((response) => {
        if (response.data.status == "true") {
          console.log("room created");
        } else {
          console.log("room already exist");
        }
      });
  }
  return (
    <>
      {" "}
      <div
        className={styles.body}
        onClick={() => {
          setVisible(() => "flex");
        }}
      >
        <div className={styles.button}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={styles.buttonin}
            onClick={() => {
              setBtntxt(() => "Create Room");
            }}
          >
            New Room
          </motion.button>
        </div>
        <div className={styles.button}>
          {" "}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={styles.buttonin}
            onClick={() => {
              setBtntxt(() => "Join Room");
            }}
          >
            Join Room
          </motion.button>
        </div>
      </div>
      <div className={styles.popup} style={{ display: visible }}>
        <div className={styles.popupbody}>
          <motion.input
            whileHover={{ scale: 1.05 }}
            className={styles.roomname}
            type="text"
            placeholder="Room Name"
            onChange={(e) => setRoomname(() => e.target.value)}
          ></motion.input>
          <motion.input
            whileHover={{ scale: 1.05 }}
            className={styles.roompassword}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(() => e.target.value)}
          ></motion.input>
          <motion.button
            className={styles.createbutton}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setVisible(() => "none");
              createuser();
            }}
          >
            {btntxt}
          </motion.button>
        </div>
      </div>
    </>
  );
}
