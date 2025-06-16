
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { motion } from "framer-motion";

import styles from './Form.module.css';

const API_URL = 'http://localhost:3001/addclient';

const validationSchema = yup.object({
  nome: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Insira um e-mail válido').required('Campo obrigatório'),
  telefone: yup.string().required('Campo obrigatório'),
  empresa: yup.string().required('Campo obrigatório'),
  cargo: yup.string().required('Campo obrigatório'),
});

export default function ClientForm() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        cargo: ''
    },
    validationSchema,
    onSubmit: async (values) => {
        try {
            await axios.post(API_URL, values, {
            headers: { 'Content-Type': 'application/json' },
            });

            navigate('/clients');
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
      className={styles.clientFormContainer}
    >
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
                id="telefone"
                name="telefone"
                label="Telefone"
                autoComplete="phone"
                variant="standard"
                value={formik.values.telefone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.telefone && Boolean(formik.errors.telefone)}
                helperText={formik.touched.telefone && formik.errors.telefone}
            />

            <TextField
                fullWidth
                margin="normal"
                id="empresa"
                name="empresa"
                label="Empresa"
                variant="standard"
                value={formik.values.empresa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.empresa && Boolean(formik.errors.empresa)}
                helperText={formik.touched.empresa && formik.errors.empresa}
            />

            <TextField
                fullWidth
                margin="normal"
                id="cargo"
                name="cargo"
                label="Cargo"
                variant="standard"
                value={formik.values.cargo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cargo && Boolean(formik.errors.cargo)}
                helperText={formik.touched.cargo && formik.errors.cargo}
            />

            {message && (
                <p style={{ fontSize: '0.84em', color: '#d32f2f', marginTop: '8px' }}>
                    {message}
                </p>
            )}

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                <Button type="button" variant="text" fullWidth onClick={() => navigate('/clients')}>
                    Voltar
                </Button>
                <Button type="submit" variant="contained" fullWidth>
                    Cadastrar
                </Button>
            </div>
      </form>
    </motion.div>
  );
}