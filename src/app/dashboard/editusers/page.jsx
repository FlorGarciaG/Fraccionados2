"use client";
import styles from './page.module.css';
import React from "react";
import { useRouter } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

const EditUsers = () => {
    const { data: session, status } = useSession();
    const router = useRouter();


    const regresar = () => {
        router.back();
    };

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchUsers = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/users');
            if (!res.ok) {
                throw new Error('Error al obtener datos de usuarios');
            }
            const data = await res.json();
            setUsers(data);
            //  console.log(session?.user);
            const authUser = data.find(user => user.name === session?.user?.name);
            if (authUser.role === 'admin') {
                setIsAdmin(true);
            }
        } catch (error) {
            console.error('Error al obtener datos de usuarios', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await fetch(`/api/users/${editingUserId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        password,
                        role,
                    }),
                });
                setIsEditing(false);
                setName('');
                setPassword('');
                setRole('user');
                fetchUsers();
            } else {
                await fetch("/api/users", {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        role,
                        password,
                    }),
                });
                e.target.reset();
                setName('');
                setPassword('');
                setRole('user');
                fetchUsers();
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/users/${id}`, {
                method: 'DELETE',
            });
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };


    const handleEdit = async (id) => {
        try {
            const res = await fetch(`/api/users/${id}`);
            const data = await res.json();

            setName(data.name);
            // setPassword(data.password);
            setRole(data.role);

            setEditingUserId(id);
            setIsEditing(true);
        } catch (error) {
            console.error('Error al obtener datos para editar usuario', error);
        }
    };


    if (status === 'loading') {
        return <p>Cargando...</p>;
    }   

    // console.log(isAdmin);

    if (status === 'unauthenticated' ) {
        router?.push('/');
    }

    if (status === 'authenticated' && isAdmin) {
        return (
            <div>
                <div className={styles.body}>
                    <br />
                    <h1 className={styles.h1}>Edición de Usuarios</h1>
                    <div className={styles.principal}>
                        <div className={styles.contenido}>
                            <div>
                                <button className={styles.botonRegresar} onClick={regresar}>←</button>
                            </div>
                            <hr className={styles.lineDivider} />

                            <form onSubmit={handleSubmit}>
                                <div className={styles.inputContainer}>
                                    <div>
                                        Nombre: <input
                                            className={styles.controls}
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        Contraseña: <input
                                            className={styles.controls}
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        Rol: <select
                                            className={styles.controls}
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            required>
                                            <option value="user">Usuario</option>
                                            <option value="admin">Administrador</option>
                                        </select>
                                    </div>

                                </div>
                                <div>
                                    <button type="submit" className={styles.botonAgregar}>{isEditing ? 'Actualizar Usuario' : 'Agregar Usuario'}</button>
                                </div>
                            </form>
                            <table className={styles.usersTable}>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Rol</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <div>
                                                    <button className={styles.editButton} onClick={() => handleEdit(user._id)} disabled={isEditing && editingUserId === user._id}>Editar</button>
                                                    <button className={styles.deleteButton} onClick={() => handleDelete(user._id)}>Eliminar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default EditUsers;
