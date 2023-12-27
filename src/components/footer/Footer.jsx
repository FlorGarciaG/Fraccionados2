import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>&copy; 2023 Derechos reservados</div>
      <div className={styles.videoLinks}>
        <a href="https://www.youtube.com/watch?v=fIiIF1i2AEA"><FaYoutube className={styles.icon} />Fracciones Propias</a>
        <a href="https://www.youtube.com/watch?v=GrDSkqyBHXo"><FaYoutube className={styles.icon} />Fracciones Impropias</a>
      </div>
      <div className={styles.social}>
        <a><FaFacebook className={styles.icon} /></a>
        <a><FaInstagram className={styles.icon} /></a>
        <a><FaTwitter className={styles.icon} /></a>
      </div>
    </div>
  );
};

export default Footer;
