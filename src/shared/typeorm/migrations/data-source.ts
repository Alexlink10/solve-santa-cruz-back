import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Orders from '@modules/orders/typeorm/entities/Orders';
import { CreateOrder1773826964192 } from './1777826964192-CreateOrder';
import { CreateProblems1724184777589 } from './124184777589-CreateProblems';
import Problems from '@modules/problems/typeorm/entities/Problems';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'solveSantaCruz',

  entities: [Problems, Orders],
  migrations: [CreateProblems1724184777589, CreateOrder1773826964192],

  synchronize: false, // NUNCA true em produção
  logging: true,
});
