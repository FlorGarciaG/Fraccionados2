"use client"
import React, { useState, useEffect } from "react";
import Relog from '@/components/relog/Relog';
import styles from './page.module.css';

const Propias = () => {
  const [problems, setProblems] = useState([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [respuestaNumerador, setRespuestaNumerador] = useState("");
  const [respuestaDenominador, setRespuestaDenominador] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/problems', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Error al solicitar datos');
        }

        const data = await res.json();
        setProblems(data);
      } catch (error) {
        console.error('Error al obtener datos', error);
      }
    };

    fetchData();
  }, []);

  function validarInput(event) {
    var tecla = event.keyCode || event.which;
    if ((tecla >= 48 && tecla <= 57) || tecla === 8) {
      return;
    } else {
      event.preventDefault();
    }
  }

  const handleCheckAnswer = () => {
    const problem = problems[currentProblemIndex];
    const { resNumerador, resDenominador } = problem;
    // console.log('Respuestas de la base de datos:', resNumerador);
    // console.log('Respuestas de la base de datos:', resDenominador);
    // console.log('Respuestas :', parseInt(respuestaNumerador));
    // console.log('Respuestas :', parseInt(respuestaDenominador));
    if (
      parseInt(respuestaNumerador) === resNumerador &&
      parseInt(respuestaDenominador) === resDenominador
    ) {
      if (currentProblemIndex + 1 < problems.length) {
        setCurrentProblemIndex(currentProblemIndex + 1);
        setRespuestaNumerador("");
        setRespuestaDenominador("");
      } else {
        // setTime(prevTime => ({ ...prevTime, finished: true }));
        alert("¡Has completado todos los problemas!");
      }
    } else {
      alert("Respuesta incorrecta. ¡Inténtalo de nuevo!");
    }
  };

  return (
    <div className={styles.principal}>
      <h1 className={styles.h1}>Fracciones</h1>
      <h1 className={styles.h1}>Propias</h1>
      <br />
      <div>
        <a className={styles.a} href='/impropias'>
          Impropias
        </a>
        <a className={styles.a} href='/escape'>
          Escape Room
        </a>
      </div>
      <br />
      <div className={styles.customCard}>
        <div className={styles.cardHead}>
          <button className={styles.arrowButton} onClick={() => window.history.back()}>
            ←
          </button>
          <Relog />
        </div>
        <hr className={styles.lineDivider} />
        {problems.slice(currentProblemIndex, currentProblemIndex + 1).map((problem, index) => (
          <div key={index} className={styles.cardBody}>
            <div id='problema' className={styles.problema}>
              <div id='problema1' className={styles.problema1}>
                <p>{problem.numerador1}</p>
                <hr className={styles.hrPro} />
                <p>{problem.denominador1}</p>
              </div>
              <p className={styles.operacion}>{problem.operacion}</p>
              <div id='problema2' className={styles.problema2}>
                <p>{problem.numerador2}</p>
                <hr className={styles.hrPro} />
                <p>{problem.denominador2}</p>
              </div>
            </div>
            <input
              className={styles.smallInput}
              type='text'
              name='respuestaNumerador'
              value={respuestaNumerador}
              onChange={(event) => setRespuestaNumerador(event.target.value)}
              required
              autoComplete='off'
              onKeyDown={(event) => validarInput(event)}
            />
            <hr className={styles.hr} />
            <input
              className={styles.smallInput}
              type='text'
              name='respuestaDenominador'
              value={respuestaDenominador}
              onChange={(event) => setRespuestaDenominador(event.target.value)}
              required
              autoComplete='off'
              onKeyDown={(event) => validarInput(event)}
            />
            <br />
            <button
              className={styles.btnSeparate}
              onClick={handleCheckAnswer}>
              Comprobar
            </button>
          </div>
        ))}
        <hr className={styles.lineDivider} />
        <div className={styles.cardFooter}>
          <div>
            <span>{currentProblemIndex + 1} / {problems.length} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Propias;
