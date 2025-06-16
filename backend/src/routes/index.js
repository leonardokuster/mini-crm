import express from 'express';
import cors from 'cors';
import routes from './routes.js';

export default (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  app.use(routes);
};