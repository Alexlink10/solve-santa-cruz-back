import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Orders from '@modules/orders/typeorm/entities/Orders';
import Problems from '@modules/problems/typeorm/entities/Problems';
import { CreateOrder1773826964192 } from './1777826964192-CreateOrder';
import { CreateProblems1724184777589 } from './124184777589-CreateProblems';
import { CreateOrderPhotos1775523254379 } from './1775523254379-OrderPhotos';
import OrderPhotos from '@modules/orders/typeorm/entities/OrderPhotos';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,

  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,

  entities: [Problems, Orders, OrderPhotos],
  migrations: [
    CreateProblems1724184777589,
    CreateOrder1773826964192,
    CreateOrderPhotos1775523254379,
  ],

  migrationsRun: true,

  synchronize: false,
  logging: true,
});
