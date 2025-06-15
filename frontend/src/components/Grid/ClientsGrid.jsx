import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Button, TextField, IconButton
} from '@mui/material';

const columns = [
  { id: 'nome', label: 'Nome', minWidth: 100, align: 'center' },
  { id: 'email', label: 'E-mail', minWidth: 100, align: 'center' },
  { id: 'telefone', label: 'Telefone', minWidth: 50, align: 'center' },
  { id: 'empresa', label: 'Empresa', minWidth: 100, align: 'center' },
  { id: 'cargo', label: 'Cargo', minWidth: 100, align: 'center' },
  { id: 'acao', label: 'Ação', minWidth: 50, align: 'center' },
];

export default function StickyHeadTable() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [editRowId, setEditRowId] = React.useState(null);
  const [editData, setEditData] = React.useState({});

  const fetchClientes = () => {
    axios.get('http://localhost:3001/clients')
      .then((res) => {
        setRows(res.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar clientes:', error);
      });
  };

  React.useEffect(() => {
    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/clients/${id}`);
      fetchClientes(); 
    } catch (err) {
      console.error('Erro ao deletar cliente:', err);
    }
  };

  const handleEdit = (row) => {
    setEditRowId(row.id);
    setEditData(row);
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditData({});
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/clients/${editRowId}`, editData);
      setEditRowId(null);
      setEditData({});
      fetchClientes();
    } catch (err) {
      console.error('Erro ao atualizar cliente:', err);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: '85vw', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>
                    {columns.map((column) => {
                      if (column.id === 'acao') {
                        return (
                          <TableCell key="acao" align="center">
                            {editRowId === row.id ? (
                              <>
                                <IconButton onClick={handleSave}><CheckIcon /></IconButton>
                                <IconButton onClick={handleCancel}><CloseIcon /></IconButton>
                              </>
                            ) : (
                              <>
                                <IconButton onClick={() => handleEdit(row)}><EditIcon /></IconButton>
                                <IconButton onClick={() => handleDelete(row.id)}><DeleteIcon /></IconButton>
                              </>
                            )}
                          </TableCell>
                        );
                      }

                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="center">
                          {editRowId === row.id ? (
                            <TextField
                              variant="standard"
                              value={editData[column.id] || ''}
                              onChange={(e) => handleEditChange(column.id, e.target.value)}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <div style={{ marginTop: 16, textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/addClient')}>
          Cadastrar Cliente
        </Button>
      </div>
    </>
  );
}
