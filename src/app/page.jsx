"use client";
import styles from './page.module.css';
import Link from 'next/link';
import Card from '@/components/card/card';
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Navbar from '@/components/navbar/Navbar';


const Home = () => {
  const session = useSession();
  return (
    <div className={styles.container}>
      <br />
      <h1 className={styles.h1}>Fracciones</h1>
      <br />
      <Navbar />
      <br /><br />
      <div className={styles.row}>
        <div className={styles.col}>
          <Card imageUrl="/imagen/propias.jpg" title="Propias" link="/propias" tlink="Jugar" />
        </div>
        <div className={styles.col}>
          <Card imageUrl="/imagen/impropias.jpg" title="Impropias" link="/impropias" tlink="Jugar" />
        </div>
        <div className={styles.col}>
          <Card imageUrl="/imagen/escape.jpg" title="Escape room" link="/escape" tlink="Jugar" />
        </div>
      </div>
    </div>
  );
};

export default Home;
