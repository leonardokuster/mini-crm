import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import {
  Box, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, MenuItem, Select, InputLabel, FormControl,
  CircularProgress, Alert, IconButton, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'http://localhost:3001';

const initialState = {
  id: null,
  cliente_id: '',
  tipo: '',
  data: new Date().toISOString().split('T')[0],
  observacoes: ''
};

export default function InteractionsPage() {
  const [interacoes, setInteracoes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(initialState);
  
  const isEditing = formData.id !== null;

  const clientesMap = useMemo(() => {
    const map = {};
    clientes.forEach(cliente => {
      map[cliente.id] = cliente.nome;
    });
    return map;
  }, [clientes]);

  const fetchInteracoes = useCallback(() => {
    setLoading(true);
    axios.get(`${API_URL}/interactions`)
      .then((res) => {
        setInteracoes(res.data);
      })
      .catch((err) => {
        console.error('Erro ao buscar interações', err);
        setError('Não foi possível carregar as interações.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/clients`)
      .then((res) => setClientes(res.data))
      .catch((err) => {
        console.error('Erro ao buscar clientes', err);
        setError('Não foi possível carregar os clientes.');
      });
    
    fetchInteracoes();
  }, [fetchInteracoes]);

  const handleOpenDialog = (interaction = null) => {
    if (interaction) {
      setFormData({
        id: interaction.id,
        cliente_id: interaction.cliente_id,
        tipo: interaction.tipo,
        data: new Date(interaction.data).toISOString().split('T')[0],
        observacoes: interaction.observacoes
      });
    } else {
      setFormData(initialState);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(initialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.cliente_id || !formData.tipo || !formData.data) {
      alert('Por favor, preencha os campos Cliente, Tipo e Data.');
      return;
    }

    const request = isEditing
      ? axios.put(`${API_URL}/interactions/${formData.id}`, formData)
      : axios.post(`${API_URL}/interactions`, formData);

    request
      .then((res) => {
        if (isEditing) {
          setInteracoes(interacoes.map(item => 
            item.id === formData.id ? { ...item, ...res.data.interacao } : item
          ));
        } else {
          setInteracoes([res.data, ...interacoes]);
        }
        handleCloseDialog();
      })
      .catch((err) => {
        console.error('Erro ao salvar interação', err);
        const errorMessage = err.response?.data?.message || 'Erro ao salvar interação.';
        alert(errorMessage);
      });
  };

  const handleDelete = (interactionId) => {
    if (window.confirm('Tem certeza que deseja excluir esta interação?')) {
      axios.delete(`${API_URL}/interactions/${interactionId}`)
        .then(() => {
          setInteracoes(interacoes.filter(item => item.id !== interactionId));
        })
        .catch((err) => {
          console.error('Erro ao excluir interação', err);
          const errorMessage = err.response?.data?.message || 'Erro ao excluir a interação.';
          alert(errorMessage);
        });
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Interações</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Nova Interação
      </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Box mt={4}>
        {loading ? (
          <CircularProgress />
        ) : (
          interacoes.map((item) => (
            <Box key={item.id} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography>
                  <strong>Cliente:</strong> {clientesMap[item.cliente_id] || item.cliente?.nome || 'Não identificado'}
                </Typography>
                <Typography><strong>Tipo:</strong> {item.tipo}</Typography>
                <Typography><strong>Data:</strong> {new Date(item.data).toLocaleDateString()}</Typography>
                <Typography><strong>Observações:</strong> {item.observacoes}</Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <IconButton onClick={() => handleOpenDialog(item)} color="primary"><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(item.id)} color="error"><DeleteIcon /></IconButton>
              </Stack>
            </Box>
          ))
        )}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? 'Editar Interação' : 'Nova Interação'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Cliente</InputLabel>
            <Select
              name="cliente_id"
              value={formData.cliente_id}
              onChange={handleChange}
              label="Cliente"
              required
            >
              {clientes.map((cliente) => (
                <MenuItem key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              label="Tipo"
              required
            >
              <MenuItem value="reunião">Reunião</MenuItem>
              <MenuItem value="ligação">Ligação</MenuItem>
              <MenuItem value="e-mail">E-mail</MenuItem>
              <MenuItem value="outro">Outro</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="data"
            label="Data"
            type="date"
            value={formData.data}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            name="observacoes"
            label="Observações"
            multiline
            rows={3}
            value={formData.observacoes}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {isEditing ? 'Salvar Alterações' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}