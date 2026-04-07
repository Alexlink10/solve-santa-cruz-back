import { AppDataSource } from '@shared/typeorm/migrations/data-source';
import Orders from '../typeorm/entities/Orders';

class ListOrdersService {
  public async execute(): Promise<Orders[]> {
    try {
      const ordersRepository = AppDataSource.getRepository(Orders);

      const orders = await ordersRepository.find({
        relations: ['photos'],
      });

      return orders;
    } catch (error) {
      console.log('ERRO AQUI >>', error);
      throw error;
    }
  }
}

export default ListOrdersService;
