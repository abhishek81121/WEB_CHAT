"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inavlidu, setInvalidu] = useState("hidden");
  function loginto() {
    axios
      .post("/api/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.status == "true") {
          router.push("./chat");
          setInvalidu("hidden");
        } else {
          setInvalidu("visible");
        }
      });
  }
  return (
    <main className={styles.main}>
      <div className={styles.maincard}>
        <div className={styles.logincred}>
          <div className={styles.username}>
            <img src="./profile.png" className={styles.usernameimage}></img>
            <input
              className={styles.input}
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
                inavlidu == "visible" ? setInvalidu("hidden") : null;
              }}
            />
          </div>
          <div className={styles.username}>
            <img src="./padlock.png" className={styles.usernameimage}></img>
            <input
              className={styles.input}
              type="Password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                inavlidu == "visible" ? setInvalidu("hidden") : null;
              }}
            />
          </div>
          <motion.div
            className={styles.buttoncontainer}
            whileHover={{ scale: 1.05 }}
          >
            <button className={styles.button} onClick={loginto}>
              Login
            </button>
          </motion.div>
          <span
            style={{
              textDecoration: "bold",
              fontSize: "larger",
              visibility: inavlidu,
            }}
          >
            Username or Password is inavlid!
          </span>
          <Link href="/signup" className={styles.linkto}>
            Sign Up
          </Link>
        </div>
        <div className={styles.loginpic}>
          <img className={styles.pic} src="./loginpic.png"></img>
        </div>
      </div>
    </main>
  );
}
