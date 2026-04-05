import Orders from '../typeorm/entities/Orders';
import { AppDataSource } from '../../../shared/typeorm/migrations/data-source';

interface Irequest {
  problems_id: string;
  address?: string;
  number?: string;
  neighborhooduf?: string;
  latitude?: number;
  longitude?: number;
  reference: string;
  descrition: string;
}

class CreateOrderService {
  public async execute({
    problems_id,
    address,
    number,
    neighborhooduf,
    latitude,
    longitude,
    reference,
    descrition,
  }: Irequest): Promise<Orders> {
    const ordersRepository = AppDataSource.getRepository(Orders);

    const orders = ordersRepository.create({
      problems_id,
      address,
      number,
      neighborhooduf,
      latitude,
      longitude,
      reference,
      descrition,
    });
    await ordersRepository.save(orders);
    return orders;
  }
}

export default CreateOrderService;
