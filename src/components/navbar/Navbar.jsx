"use client";

import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import { signOut, useSession } from "next-auth/react";

const links = [
  { id: 1, title: 'Inicio', url: '/' },
  { id: 2, title: 'Contacto', url: '/contacto' },
  { id: 3, title: 'Dashboard', url: '/dashboard' },
]
const Navbar = () => {
  const session = useSession();
  return(
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.linktext}>
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
              <button className={styles.logout} onClick={signOut}>
                Logout
              </button>
            )}
      </div>
    </div>
  )
}

export default Navbar