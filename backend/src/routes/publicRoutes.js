import express from "express";
import SessionController from "../controllers/sessionController.js";
import ClientsController from "../controllers/clientsController.js";
import InteractionsController from "../controllers/interactionsController.js";

const publicRoutes = express.Router();

publicRoutes
  .post('/login', SessionController.logarUsuario)
  .post('/signup', SessionController.cadastrarUsuario);

publicRoutes
  .post('/addclient', ClientsController.cadastrarCliente)
  .get('/clients', ClientsController.listarClientes)
  .put('/clients/:cliente_id', ClientsController.editarCliente)
  .delete('/clients/:cliente_id', ClientsController.removerCliente);

publicRoutes
  .post('/interactions', InteractionsController.criarInteracao)
  .get('/interactions', InteractionsController.listarTodasInteracoes)
  .get('/interactions/:cliente_id', InteractionsController.listarInteracoesPorCliente)
  .put('/interactions/:id', InteractionsController.editarInteracao)
  .delete('/interactions/:id', InteractionsController.removerInteracao);

export default publicRoutes;