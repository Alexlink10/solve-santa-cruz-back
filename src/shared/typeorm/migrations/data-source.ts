import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Orders from '@modules/orders/typeorm/entities/Orders';
import Problems from '@modules/problems/typeorm/entities/Problems';
import { CreateOrder1773826964192 } from './1777826964192-CreateOrder';
import { CreateProblems1724184777589 } from './124184777589-CreateProblems';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false,
  },

  entities: [Problems, Orders],
  migrations: [CreateProblems1724184777589, CreateOrder1773826964192],

  synchronize: false,
  logging: true,
});
