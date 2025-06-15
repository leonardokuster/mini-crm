import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import styles from '../../styles/components/loginform.module.css';
import Link from 'next/link';
import axios from 'axios';
import { motion } from "framer-motion";

export default function Form() {
    const [message, setMessage] = useState('');
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            senha: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('http://localhost:3001/login', values, {
                    headers: { 'Content-Type': 'application/json' },
                });
                const { token, usuario } = response.data;

                localStorage.setItem('token', token);
                localStorage.setItem('nome', usuario.nome);
                localStorage.setItem('tipo', usuario.tipo);
                localStorage.setItem('usuario_id', usuario.id);
                

                console.log(`ID do usuário: ${usuario.id}`);
                
                router.push('/dashboard');              
            } catch (err) {
                console.log('Erro:', err);
                if (err.response) {
                    if (err.response.status === 401) {
                        setMessage('Credenciais inválidas');
                    } else {
                        setMessage('Erro ao tentar fazer login');
                    }
                } else {
                    setMessage('Erro ao tentar fazer login');
                }
            }
        },   
    });

    const renderErrorMessage = () => {
        return <h3 style={{ fontSize: '0.84em', color: '#202949', textAlign: 'left' }}>{message}</h3>;
    };

    return (
        <>
            <motion.div
                className={styles['loginform']}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Realize seu login abaixo:</h2>
                <form onSubmit={formik.handleSubmit} className={styles['formulario']}>
                    <TextField
                        id="email"
                        name="email"
                        label="E-mail"
                        autoComplete="email"
                        variant="standard"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        id="senha"
                        name="senha"
                        label="Senha"
                        variant="standard"
                        autoComplete="password"
                        type="password"
                        value={formik.values.senha}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.senha && Boolean(formik.errors.senha)}
                        helperText={formik.touched.senha && formik.errors.senha}
                    />
                    {renderErrorMessage()}
                    <div>
                        <Button className={styles['botao']} type="submit" variant="contained">
                            Entrar
                        </Button>
                    </div>
                    <br />
                </form>
            </motion.div>
        </>
    );
}