import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Button({ Text, onClick, Type = "button" }) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" type={Type} onClick={onClick}>{Text}</Button>
    </Stack>
  );
}
