"use client";
import React, { useState } from "react";
import styles from './page.module.css';
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const password = e.target[1].value;

    // console.log("Nombre:", name);
    // console.log("Contraseña a enviar:", password);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });
      if (res.status === 201){
        router.push("/dashboard/login?success=La cuenta ha sido creada");
      } else if (res.status === 409){
        alert('El usuario ya existe. Por favor, elige otro nombre');
      } else {
        alert('Hubo un error al registrar el usuario. Por favor, intenta nuevamente');
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className={styles.principal}>
      <h1 >Registro</h1>
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
          <button className={styles.botons}>Registrar</button>
        </form>
        <hr className={styles.lineDivider} />
        <div className={styles.cardFooter}>
          <Link href="/dashboard/login" className={styles.link}>¿Ya tienes una Cuenta?</Link>
        </div>
        <br />
      </div>
      {error && 'Algo salió mal!'}
    </div>
  );
};

export default Register;
