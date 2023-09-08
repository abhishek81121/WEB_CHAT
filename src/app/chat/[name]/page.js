"use client";
import styles from "./page.module.css";
import firebase_app from "@/firebase/config";
import { getCookie } from "cookies-next";
import { getDatabase, onValue, ref, get, set } from "firebase/database";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function userchat({ params }) {
  const friendname = decodeURIComponent(params.name);

  const db = getDatabase(firebase_app);
  const [message, setMesssage] = useState("");
  const [firdata, setfirdata] = useState("");
  // setfirdata("abhishek:hello,abhishek:helloadsdas");
  var username = getCookie("username");
  var key;
  var sendmessage;
  if (username >= friendname) {
    key = username + friendname;
  } else {
    key = friendname + username;
  }
  var props;
  console.log(key);
  const initialmessage = ref(db, "message/" + key);
  console.log(initialmessage);
  useEffect(() => {
    onValue(initialmessage, (snapshot) => {
      const data = snapshot.val();
      setfirdata(data.messages);
      console.log(data);
    });
  }, []);
  var i = 0;

  return (
    <div className={styles.main}>
      <div className={styles.contacts}>
        <div className={styles.friendlist}>
          {firdata.split(",").map((el) => {
            var str = el.split(":");

            return (
              <motion.div
                whileHover={{ scale: 1.2 }}
                key={i++}
                className={styles.smalldiv}
              >
                {el}
              </motion.div>
            );
          })}
        </div>
        <div className={styles.addfriend}>
          <motion.input
            type="text"
            placeholder="Message"
            className={styles.friendsername}
            whileHover={{ scale: 1.02 }}
            value={message}
            onChange={(e) => {
              setMesssage(e.target.value);
            }}
          ></motion.input>
          <motion.button
            className={styles.find}
            whileHover={{ scale: 1.07 }}
            onClick={function () {
              get(initialmessage).then((snapshot) => {
                sendmessage = snapshot.val().messages;
                console.log(sendmessage);
                if (sendmessage == "") sendmessage = username + ":" + message;
                else sendmessage = sendmessage + "," + username + ":" + message;
                console.log(sendmessage);
              });
              setTimeout(() => {
                const reference = ref(db, "message/" + key);
                console.log(sendmessage);
                set(reference, {
                  messages: sendmessage,
                });
                setMesssage("");
              }, 500);
            }}
          >
            {">"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
