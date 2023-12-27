"use client";
import styles from './page.module.css';
import React from "react";
import TablaProblems from "@/components/tablaProblems/tablaProblems"
import { useRouter } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";

import { useEffect, useState } from 'react';


const EditProblems = () => {
    const session = useSession();
    const router = useRouter();

    const regresar = () => {
        router.back();
    };

    const [numerador1, setNumerador1] = useState('');
    const [denominador1, setDenominador1] = useState('');
    const [operacion, setOperacion] = useState('');
    const [numerador2, setNumerador2] = useState('');
    const [denominador2, setDenominador2] = useState('');
    const [resNumerador, setResNumerador] = useState('');
    const [resDenominador, setResDenominador] = useState('');
    const [problems, setProblems] = useState([]);

    const [selectedOption, setSelectedOption] = useState(false);

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/problemsIm', {
                cache: 'no-store',
            });

            if (!res.ok) {
                throw new Error('Error al solicitar datos');
            }

            const data = await res.json();
            //console.log('Datos de la base de datos:', data);
            setProblems(data);
        } catch (error) {
            console.error('Error al obtener datos', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        // console.log(id);
        try {
            await fetch(`/api/problemsIm/${id}`, {
                method: 'DELETE',
            });
            setProblems(problems.filter((problem) => problem._id !== id));
        } catch (error) {
            console.error('Error deleting problem', error);
        }
    };

    //Esto es para saber si los datos estan en el formulario
    const [isEditing, setIsEditing] = useState(false);
    const [editingProblemId, setEditingProblemId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log("Datos a enviar:", e);
        // console.log(editingProblemId);
        try {
            if (isEditing) {
                await fetch(`/api/problemsIm/${editingProblemId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        numerador1,
                        denominador1,
                        operacion,
                        numerador2,
                        denominador2,
                        resNumerador,
                        resDenominador,
                    }),
                });
                setIsEditing(false);
                setNumerador1('');
                setDenominador1('');
                setOperacion('');
                setNumerador2('');
                setDenominador2('');
                setResNumerador('');
                setResDenominador('');
                fetchData();
            } else {
                await fetch("/api/problemsIm", {
                    method: "POST",
                    body: JSON.stringify({
                        numerador1,
                        denominador1,
                        operacion,
                        numerador2,
                        denominador2,
                        resNumerador,
                        resDenominador,
                    }),
                });
                e.target.reset();
                setNumerador1('');
                setDenominador1('');
                setOperacion('');
                setNumerador2('');
                setDenominador2('');
                setResNumerador('');
                setResDenominador('');
                fetchData();
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleEdit = async (id) => {
        try {
            const res = await fetch(`/api/problemsIm/${id}`);
            const data = await res.json();

            setNumerador1(data.numerador1);
            setDenominador1(data.denominador1);
            setOperacion(data.operacion);
            setNumerador2(data.numerador2);
            setDenominador2(data.denominador2);
            setResNumerador(data.resNumerador);
            setResDenominador(data.resDenominador);

            // setProblemId(id);

            setEditingProblemId(id);
            setIsEditing(true);
        } catch (error) {
            console.error('Error al obtener datos para editar', error);
        }
    };


    if (session.status === "loading") {
        return <p>Cargando...</p>;
    }

    if (session.status === "unauthenticated") {
        router?.push("/");
    }

    if (session.status === "authenticated") {
        return (
            <div className={styles.body}>
                <br />
                <h1 className={styles.h1}>Edición de problemas</h1>
                <div className={styles.principal}>
                    <div className={styles.contenido}>
                        <div>
                            <button className={styles.botonRegresar} onClick={regresar}>←</button>
                        </div>
                        <hr className={styles.lineDivider} />
                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputContainer}>
                                <div>
                                    Fraccion 1 <br />
                                    Numerador: <input
                                        className={styles.controls}
                                        type="number"
                                        placeholder="Numerador"
                                        value={numerador1}
                                        onChange={(e) => setNumerador1(e.target.value)}
                                        required
                                    />
                                    <br />
                                    Denominador: <input
                                        className={styles.controls}
                                        type="number"
                                        placeholder="Denominador"
                                        value={denominador1}
                                        onChange={(e) => setDenominador1(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    Operacion<br />
                                    <select
                                        className={styles.controls}
                                        value={operacion}
                                        onChange={(e) => {
                                            setSelectedOption(true);
                                            setOperacion(e.target.value);
                                        }}
                                        required={!selectedOption}
                                    >
                                        <option value="" disabled hidden>
                                            Operacion
                                        </option>
                                        <option value="+">Suma</option>
                                        <option value="-">Resta</option>
                                        <option value="*">Multiplicación</option>
                                        <option value="/">División</option>
                                    </select>
                                </div>
                                <div>
                                    Fraccion 2 <br />
                                    Numerador: <input
                                        className={styles.controls}
                                        type="number"
                                        placeholder="Numerador"
                                        value={numerador2}
                                        onChange={(e) => setNumerador2(e.target.value)}
                                        required
                                    />
                                    <br />
                                    Denominador: <input
                                        className={styles.controls}
                                        type="number"
                                        placeholder="Denominador"
                                        value={denominador2}
                                        onChange={(e) => setDenominador2(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    Respuesta <br />
                                    Numerador: <input
                                        className={styles.controls}
                                        type="number"
                                        placeholder="Numerador"
                                        value={resNumerador}
                                        onChange={(e) => setResNumerador(e.target.value)}
                                        required
                                    />
                                    <br />
                                    Denominador: <input
                                        className={styles.controls}
                                        type="number"
                                        placeholder="Denominador"
                                        value={resDenominador}
                                        onChange={(e) => setResDenominador(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <br />
                            {/* <button type="submit" className={styles.botonAgregar}>Agregar Problema</button> */}
                            <button type="submit" className={styles.botonAgregar}>
                                {isEditing ? 'Actualizar Problema' : 'Agregar Problema'}
                            </button>
                        </form>
                        <TablaProblems
                            problems={problems}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            isEditing={isEditing}
                            editingProblemId={editingProblemId} />
                    </div>
                </div>
            </div>
        );
    }
};

export default EditProblems;

