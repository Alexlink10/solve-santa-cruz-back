import { AppDataSource } from '@shared/typeorm/migrations/data-source';
import Orders from '../typeorm/entities/Orders';

class ExportOrderService {
  public async execute(): Promise<Orders[]> {
    const ordersRepository = AppDataSource.getRepository(Orders);

    const orders = await ordersRepository.find();
    return orders;
  }
}

export default ExportOrderService;
