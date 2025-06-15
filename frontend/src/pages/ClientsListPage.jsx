import React from 'react';
import { Typography } from '@mui/material';
import ClientsGrid from '../components/Grid/ClientsGrid.jsx';

const ClientsListPage = () => {
  return (
    <div style={{ minHeight: '50vh', textAlign: 'center', display: 'flex', flexDirection: 'column' , justifyContent: 'center', alignContent: 'center', gap: '15px', maxWidth: '95%'}}>
      <Typography variant="h4">Confira a lista de clientes:</Typography>
      <ClientsGrid/>
    </div>
  );
};

export default ClientsListPage;