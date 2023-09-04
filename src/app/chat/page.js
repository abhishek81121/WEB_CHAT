"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import axios from "axios";
export default function () {
  const [nameoffriend, setfriend] = useState("");
  async function addfriend() {
    console.log(nameoffriend);
    axios
      .post("/api/chat/showfriend", {
        friendname: nameoffriend,
      })
      .then((response) => {
        console.log(response);
      });
  }
  return (
    <div className={styles.main}>
      <div className={styles.contacts}>
        <div className={styles.friendlist}></div>
        <div className={styles.addfriend}>
          <motion.input
            type="text"
            className={styles.friendsername}
            whileHover={{ scale: 1.02 }}
            onChange={(e) => {
              setfriend(e.target.value);
            }}
          ></motion.input>
          <motion.button
            className={styles.find}
            whileHover={{ scale: 1.07 }}
            onClick={addfriend}
          >
            +
          </motion.button>
        </div>
      </div>
      <div className={styles.chat}>
        <div className={styles.message}></div>
      </div>
    </div>
  );
}
