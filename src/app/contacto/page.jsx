"use client";
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import React from "react";

const Contacto = () => {
    // Importa el useRouter para la navegación
    const router = useRouter();

    //funcion para regresar a la pagina anterior del historial de navegacion
    const regresar = () => {
        router.back();
    };

    return (
        <div className={styles.body}>
            <br />
            <h1 className={styles.h1}>Contacto</h1>
            <div className={styles.principal}>
                <div className={styles.contenido}>
                    <div>
                        <button className={styles.botonRegresar} onClick={regresar}>←</button>
                    </div>
                    <hr className={styles.lineDivider} />
                    <p className={styles.p}>¡Gracias por visitar nuestro juego de fracciones!</p><br />
                    <p className={styles.p}>Somos una organización educativa con un enfoque apasionante en la enseñanza de una amplia
                        variedad de temas a través de juegos y actividades interactivas.
                        En particular, nos dedicamos al área de matemáticas.</p><br />
                    <p className={styles.p}>Acerca de nuestra Página de Fracciones:</p><br />
                    <p className={styles.p}>Nuestro principal objetivo es ayudar a los estudiantes a dominar las fracciones,
                        tanto en términos de comprensión conceptual como en la realización de operaciones con
                        ellas, como sumas, restas, multiplicaciones y divisiones. Creemos firmemente que el
                        aprendizaje a través de la diversión y la práctica efectiva es la clave para el éxito
                        académico </p><br />
                    <p className={styles.p}>Si tienes alguna pregunta o comentario, no dudes en contactarnos:</p><br />
                    <p className={styles.p}>Correo electrónico: fraccionados@gamefracciones.com</p><br />
                    <p className={styles.p}>Teléfono: 111 111 11 11</p><br />
                </div>
                <div className={styles.imagen}>
                    <img src="/imagen/contac.jpg" alt="Imagen" className={styles.img} />
                </div>
            </div>
        </div >
    );
};

export default Contacto;




