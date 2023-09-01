"use client";
import styles from "./page.module.css";
import { motion } from "framer-motion";
export default function () {
  return (
    <div className={styles.main}>
      <div className={styles.contacts}>
        <div className={styles.friendlist}></div>
        <div className={styles.addfriend}>
          <motion.input
            type="text"
            className={styles.friendsername}
            whileHover={{ scale: 1.02 }}
          ></motion.input>
          <motion.button className={styles.find} whileHover={{ scale: 1.07 }}>
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
