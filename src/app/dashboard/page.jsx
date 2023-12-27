"use client";
import styles from './page.module.css';
import Card from '@/components/card/card';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from '@/components/navbar/Navbar';


const dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [authUser, setAuthUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users');
      if (!res.ok) {
        throw new Error('Error al obtener datos de usuarios');
      }
      const data = await res.json();


      const filteredUser = data.find(user => user.name === session?.user?.name);
      // console.log( filteredUser);
      setAuthUser(filteredUser);
      if (filteredUser.role === 'admin'){
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error al obtener datos de usuarios', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (status === "unauthenticated") {
    router?.push("/dashboard/login");
  }


  if (status === "authenticated") {

    return (
      <div className={styles.container}>
        <br />
        <h1 className={styles.h1}>Fracciones</h1>
        <h1 className={styles.h1}>
          {authUser ? `Bienvenido, ${authUser.name}` : `Bienvenido, ${session?.user?.name || 'Usuario'}`}
        </h1>
        <br />
        <Navbar />
        <br /><br />
        <div className={styles.row}>
          <div className={styles.col}>
            <Card imageUrl="/imagen/propias.jpg" title="Propias" link="/dashboard/editproblemsp" tlink="Editar" />
          </div>
          <div className={styles.col}>
            <Card imageUrl="/imagen/impropias.jpg" title="Impropias" link="dashboard/editproblemsIm" tlink="Editar" />
          </div>
          <div className={styles.col}>
            <Card imageUrl="/imagen/escape.jpg" title="Escape room" link="/dashboard/editproblemsEs" tlink="Editar" />
          </div>
        </div>
         {isAdmin && (
          <div className={styles.row}>
            <div className={styles.col}>
              <Card imageUrl="/imagen/user.png" title="Usuarios" link="/dashboard/editusers" tlink="Editar" />
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default dashboard;
