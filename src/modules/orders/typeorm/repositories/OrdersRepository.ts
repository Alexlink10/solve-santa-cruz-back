import { Repository } from 'typeorm';
import Orders from '../entities/Orders';

export class OrdersRepository extends Repository<Orders> {}
