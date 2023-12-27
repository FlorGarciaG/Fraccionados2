"use client";
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import React from "react";
import Relog from '@/components/relog/Relog';

const nivel2 = () => {
    const router = useRouter();

    const regresar = () => {
        router.back();
    };

    return (
        <div className={styles.principal}>
            <h1 className={styles.h1}>ESCAPE ROOM</h1>
            <h1 className={styles.h1}>NIVEL 2</h1>
            <br />
            <div className={styles.customCard}>
                <div className={styles.cardHead}>
                    <Relog/>
                </div>
                <hr className={styles.lineDivider} />
                <div className={styles.cardBody}>
                    <div id="problema" className={styles.problema}>
                        <div id="problema1" className={styles.problema1}>
                            <p id="numeradorp1" >numerador</p>
                            <hr className={styles.hr} />
                            <p id="denominadorp1">denominador</p>
                        </div>
                        <p id="operacion" className={styles.operacion}>+ - * /</p>
                        <div id="problema2" className={styles.problema2}>
                            <p id="numeradorp2">numerador</p>
                            <hr className={styles.hr} />
                            <p id="denominadorp2">denominador</p>
                        </div>
                    </div>
                    <input
                        className={styles.smallInput}
                        type="text"
                        name="respuesta"
                        id="rnumerador"
                        required
                        autoComplete="off"
                        onKeyDown={(event) => validarInput(event)}
                    />
                    <hr className={styles.hr} />
                    <input
                        className={styles.smallInput}
                        type="text"
                        name="respuesta"
                        id="rdenominador"
                        required
                        autoComplete="off"
                        onKeyDown={(event) => validarInput(event)}
                    />
                    <br />
                    <button className={styles.btnSeparate} onClick={() => handleCheckAnswer('propias')}>Comprobar</button>
                </div>
                <hr className={styles.lineDivider} />
                <div className={styles.cardFooter}>
                    <div>
                        <span id="numpregunta">1</span> / 4<span id="totalpreguntas" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default nivel2;
