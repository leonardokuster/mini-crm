import express from "express";
import SessionController from "../controllers/sessionController.js";
import ClientsController from "../controllers/clientsController.js";

const publicRoutes = express.Router();

publicRoutes
  .post('/login', SessionController.logarUsuario)
  .post('/signup', SessionController.cadastrarUsuario);

publicRoutes
  .post('/addclient', ClientsController.cadastrarCliente)
  .get('/clients', ClientsController.listarClientes)
  .put('/clients/:cliente_id', ClientsController.editarCliente)
  .delete('/clients/:cliente_id', ClientsController.removerCliente);

export default publicRoutes;