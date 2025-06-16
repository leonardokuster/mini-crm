import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { motion } from "framer-motion";

import styles from './Form.module.css';

const API_URL = 'http://localhost:3001/login';

const validationSchema = yup.object({
  email: yup.string().email('Insira um e-mail válido').required('Campo obrigatório'),
  senha: yup.string().required('Campo obrigatório'),
});

export default function SigninForm() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', senha: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(API_URL, values, {
          headers: { 'Content-Type': 'application/json' },
        });

        const { token, usuario } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('nome', usuario.nome);
        localStorage.setItem('usuario_id', usuario.id);

        console.log(`Token do usuário: ${token}`);
        console.log(`Nome do usuário: ${usuario.nome}`);
        console.log(`ID do usuário: ${usuario.id}`);

        navigate('/home');
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage('Não foi possível conectar ao servidor. Tente novamente.');
        }
        console.error("Erro detalhado do login:", err);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.formContainer}
    >
      <h2>Realize seu login abaixo:</h2>

      <form onSubmit={formik.handleSubmit} noValidate>
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
          autoComplete="current-password"
          variant="standard"
          value={formik.values.senha}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.senha && Boolean(formik.errors.senha)}
          helperText={formik.touched.senha && formik.errors.senha}
        />

        {message && (
          <p style={{ fontSize: '0.84em', color: '#d32f2f', marginTop: '8px' }}>
            {message}
          </p>
        )}

        <div style={{ marginTop: '16px' }}>
          <Button type="submit" variant="contained" fullWidth>
            Entrar
          </Button>
        </div>
      </form>

      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '8px' }}>Não possui conta?</p>
        <Button variant="text" component={Link} to="/signup">Cadastre-se</Button>
      </div>
    </motion.div>
  );
}