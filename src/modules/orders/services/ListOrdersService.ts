import { AppDataSource } from '@shared/typeorm/migrations/data-source';
import Orders from '../typeorm/entities/Orders';

class ListOrdersService {
  public async execute(): Promise<Orders[]> {
    const ordersRepository = AppDataSource.getRepository(Orders);

    const orders = await ordersRepository.find({ relations: ['photos'] });
    return orders;
  }
}

export default ListOrdersService;
