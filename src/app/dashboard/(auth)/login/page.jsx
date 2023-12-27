"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      name,
      password,
    });
  };

  return (
    <div className={styles.principal}>
      <h1 >Inicio Sesión</h1>
      <br />
      <div id="menu">
        <a className={styles.a} href='/'>
          Inicio
        </a>
      </div>
      <div className={styles.customCard}>
        <div className={styles.cardHead}>
          <button className={styles.arrowButton} onClick={() => router.back()}> ← </button>
        </div>
        <hr className={styles.lineDivider} />
        <form onSubmit={handleSubmit}>
          <div className={styles.cardBody}>
            <input type="text" placeholder="Ingrese su Nombre" required className={styles.controls} />
            <input
              type="password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Su contraseña debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 o más caracteres"
              placeholder="Ingrese su Contraseña"
              required
              className={styles.controls}
            />
          </div>
          <button className={styles.botons}>Iniciar Sesión</button>
        </form>
        <hr className={styles.lineDivider} />
        <div className={styles.cardFooter}>
          <Link href="/dashboard/register" className={styles.link}>¿No tienes una Cuenta?</Link>
        </div>
        <br />
      </div>
      {error && 'Credenciales incorrectas'}
    </div>
  );
};

export default Login;