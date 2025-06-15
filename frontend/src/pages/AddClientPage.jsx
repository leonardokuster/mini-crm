import React from 'react';
import { Typography } from '@mui/material';
import ClientForm from '../components/Form/ClientForm.jsx';

const AddClientPage = () => {
  return (
    <div style={{ minHeight: '50vh', textAlign: 'center', display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignContent: 'center'}}>
      <Typography variant="h4">Cadastre um cliente:</Typography>
      <ClientForm/>
    </div>
  );
};

export default AddClientPage;