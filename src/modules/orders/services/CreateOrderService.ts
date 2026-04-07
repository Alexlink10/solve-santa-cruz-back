import Orders from '../typeorm/entities/Orders';
import { AppDataSource } from '../../../shared/typeorm/migrations/data-source';
import OrderPhotos from '../typeorm/entities/OrderPhotos';

interface Irequest {
  problems_id: string;
  photos: string[];
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
    photos,
    address,
    number,
    neighborhooduf,
    latitude,
    longitude,
    reference,
    descrition,
  }: Irequest): Promise<Orders> {
    const ordersRepository = AppDataSource.getRepository(Orders);
    const photosRepository = AppDataSource.getRepository(OrderPhotos);

    const order = ordersRepository.create({
      problems_id,
      address,
      number,
      neighborhooduf,
      latitude,
      longitude,
      reference,
      descrition,
    });
    await ordersRepository.save(order);

    const photosEntities = (photos || []).map(url =>
      photosRepository.create({
        order_id: order.id,
        url,
      }),
    );
    await photosRepository.save(photosEntities);

    const orderWithPhotos = await ordersRepository.findOne({
      where: { id: order.id },
      relations: ['photos'],
    });

    return orderWithPhotos!;
  }
}

export default CreateOrderService;
