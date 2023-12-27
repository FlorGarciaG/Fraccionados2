import styles from './page.module.css';
import React from "react";


const TablaProblems = ({ problems, onDelete, onEdit, isEditing, editingProblemId}) => {
    return (
        <table className={styles.problemTable}>
            <thead>
                <tr>
                    <td colSpan="2">Fracción 1</td>
                    <td></td>
                    <td colSpan="2">Fracción 2</td>
                    <td colSpan="2">Respuesta</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Numerador</th>
                    <th>Denominador</th>
                    <th>operacion</th>
                    <th>Numerador</th>
                    <th>Denominador</th>
                    <th>Numerador</th>
                    <th>Denominador</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {problems.map((problem) => (
                    <tr key={problem._id}>
                        <td>{problem.numerador1}</td>
                        <td>{problem.denominador1}</td>
                        <td>{problem.operacion}</td>
                        <td>{problem.numerador2}</td>
                        <td>{problem.denominador2}</td>
                        <td>{problem.resNumerador}</td>
                        <td>{problem.resDenominador}</td>
                        <td>
                            <div className={styles.buttonContainer}>
                                <button className={styles.editButton} onClick={() => onEdit(problem._id)} disabled={isEditing && editingProblemId === problem._id}>Editar</button>
                                <button className={styles.deleteButton} onClick={() => onDelete(problem._id)}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TablaProblems;
