import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import { AppDataSource } from '../typeorm/migrations/data-source';
import routes from './routes';
import cors from 'cors';
import appError from '../errors/AppError';
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use(
  (
    error: Error,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    if (error instanceof appError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error('Erro inesperado no servidor:', error);

    return response.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor',
    });
  },
);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(error => console.log('Erro ao conectar no banco:', error));
/*
app.get("/", (req: Request, res: Response) => {
  res.send("Servidor rodando!");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
});*/
