
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { motion } from "framer-motion";

import styles from './Form.module.css';

const API_URL = 'http://localhost:3001/signup';

const validationSchema = yup.object({
  nome: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Insira um e-mail válido').required('Campo obrigatório'),
  senha: yup.string().min(5, 'Senha deve conter pelo menos 5 dígitos').required('Campo obrigatório'),
  confisenha: yup.string().oneOf([yup.ref('senha'), null], 'Senhas diferentes').required('Campo obrigatório'),
});

export default function SignupForm() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { nome: '', email: '', senha: '', confisenha: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(API_URL, values, {
          headers: { 'Content-Type': 'application/json' },
        });

        navigate('/');
      } catch (err) {
        setMessage('Erro ao tentar cadastrar');
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.formContainer}
    >
      <h2>Cadastre-se abaixo:</h2>

      <form onSubmit={formik.handleSubmit} noValidate>
            <TextField
                fullWidth
                margin="normal"
                id="nome"
                name="nome"
                label="Nome completo"
                variant="standard"
                value={formik.values.nome}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nome && Boolean(formik.errors.nome)}
                helperText={formik.touched.nome && formik.errors.nome}
            />

            <TextField
                fullWidth
                margin="normal"
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
                fullWidth
                margin="normal"
                id="senha"
                name="senha"
                label="Senha"
                type="password"
                variant="standard"
                value={formik.values.senha}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.senha && Boolean(formik.errors.senha)}
                helperText={formik.touched.senha && formik.errors.senha}
            />

            <TextField
                fullWidth
                id="confisenha"
                name="confisenha"
                label="Confirme sua senha"
                variant="standard"
                autoComplete="password"
                type="password"
                value={formik.values.confisenha}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confisenha && Boolean(formik.errors.confisenha)}
                helperText={formik.touched.confisenha && formik.errors.confisenha}
            />

            {message && (
                <p style={{ fontSize: '0.84em', color: '#d32f2f', marginTop: '8px' }}>
                    {message}
                </p>
            )}

            <div style={{ marginTop: '16px' }}>
                <Button type="submit" variant="contained" fullWidth>
                    Cadastrar
                </Button>
            </div>
      </form>

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '8px' }}>Já possui conta?</p>
        <Button variant="text" component={Link} to="/">Entrar</Button>
      </div>
    </motion.div>
  );
}