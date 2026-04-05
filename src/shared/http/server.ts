import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from '../typeorm/migrations/data-source';
import routes from './routes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

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
