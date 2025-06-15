import React from 'react';
import { Typography } from '@mui/material';


const HomePage = () => {
  return (
    <div style={{ minHeight: '50vh', textAlign: 'center', display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignContent: 'center', gap: '15px'}}>
      <Typography variant="h4">Bem-vindo ao mini-CRM</Typography>
      <Typography>Selecione uma ação na coluna ao lado</Typography>
    </div>
  );
};

export default HomePage;