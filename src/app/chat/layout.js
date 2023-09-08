"use client";
import { Children, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import firebase_app from "@/firebase/config";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getCookie } from "cookies-next";
export default function Layout({ children }) {
  const [nameoffriend, setfriend] = useState("");
  const [visiblity, setVisiblity] = useState("hidden");
  const [message, setMesssage] = useState("");
  const element = useRef();
  const [friendnamearr, setfriendnamearr] = useState([]);
  const router = useRouter();
  const username = getCookie("username");
  useEffect(() => {
    axios.get("/api/chat/showfriend").then(function (response) {
      setfriendnamearr(response.data.ans.split(","));
      console.log(friendnamearr);
    });
  }, []);
  async function addfriend() {
    console.log(nameoffriend);
    axios
      .post("/api/chat/addfriend", {
        friendname: nameoffriend,
      })
      .then((response) => {
        console.log(response);
        setfriend("");
        setMesssage(response.data.status);
        setVisiblity("visible");
        setTimeout(() => setVisiblity("hidden"), 2000);
        if ((response.data = "Friend Added")) {
          const db = getDatabase(firebase_app);
          var key;
          if (username >= nameoffriend) {
            key = username + nameoffriend;
          } else {
            key = nameoffriend + username;
          }
          const reference = ref(db, "message/" + key);
          set(reference, {
            messages: "",
          });
        }
      });
  }

  return (
    <main>
      <div
        className={styles.messagepop}
        ref={element}
        style={{ visibility: visiblity }}
      >
        {message}
      </div>
      <div className={styles.main}>
        <div className={styles.contacts}>
          <div className={styles.friendlist}>
            {friendnamearr.map((x) => {
              return (
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  key={x}
                  className={styles.friendinfodisp}
                  onClick={() => {
                    router.replace("/chat/" + x);
                  }}
                  style={{ borderRadius: "20px" }}
                >
                  {x}
                </motion.div>
              );
            })}
          </div>
          <div className={styles.addfriend}>
            <motion.input
              type="text"
              placeholder="Add Friend"
              className={styles.friendsername}
              whileHover={{ scale: 1.02 }}
              onChange={(e) => {
                setfriend(e.target.value);
              }}
              value={nameoffriend}
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
        <div className={styles.chat}>{children}</div>
      </div>
    </main>
  );
}
