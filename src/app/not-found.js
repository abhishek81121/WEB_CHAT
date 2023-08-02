import styles from "./page.module.css";
import Image from "next/image";
export default function notFound() {
  return (
    <div className={styles.notfound}>
      <Image fill={true} src="/404.jpg" alt="404 image"></Image>
    </div>
  );
}
