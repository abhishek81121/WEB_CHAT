"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
var bcrypt = require("bcryptjs");

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inavlidu, setInvalidu] = useState("hidden");
  function makeaccount() {
    if (username.endsWith("@web_chat")) {
      if (password.length > 5) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            axios
              .post("./api/signup", {
                username: username,
                password: hash,
              })
              .then(function (response) {
                if (response.data.status === "true") {
                  router.push("./");
                } else {
                  setInvalidu("visible");
                }
              });
          });
        });
      } else {
        setInvalidu(() => "visible");
      }
    } else {
      setInvalidu(() => "visible");
    }
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
                setInvalidu("hidden");
              }}
              title="not valid username"
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
                setInvalidu("hidden");
              }}
            />
          </div>
          <motion.div
            className={styles.buttoncontainer}
            whileHover={{ scale: 1.05 }}
          >
            <input
              type="submit"
              className={styles.button}
              value="Sign Up"
              onClick={() => {
                makeaccount();
              }}
            ></input>
          </motion.div>
          <span
            style={{
              textDecoration: "bold",
              fontSize: "larger",
              visibility: inavlidu,
            }}
          >
            Username or Password is inavlid or unavailabel!
          </span>
          <Link href="/" className={styles.linkto}>
            Log In
          </Link>
        </div>
        <div className={styles.loginpic}>
          <img className={styles.pic} src="./loginpic.png"></img>
        </div>
      </div>
    </main>
  );
}
