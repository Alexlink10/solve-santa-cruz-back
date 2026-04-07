import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ListOrdersService from '../services/ListOrdersService';
import { uploadToS3 } from '../../../config/upload'; // 👈 IMPORTANTE

export default class OrdersController {
  public async index(request: Request, response: Response) {
    const listOrdersService = new ListOrdersService();
    const orders = await listOrdersService.execute();
    return response.json(orders);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      problems_id,
      address,
      number,
      neighborhooduf,
      latitude,
      longitude,
      reference,
      descrition,
    } = request.body;

    const files = request.files as Express.Multer.File[] | undefined;

    const imageUrls: string[] = [];

    if (files?.length) {
      for (const file of files) {
        const url = await uploadToS3(file);
        imageUrls.push(url);
      }
    }

    const createOrder = new CreateOrderService();

    const orders = await createOrder.execute({
      problems_id,
      address,
      number,
      neighborhooduf,
      latitude,
      longitude,
      reference,
      descrition,
      photos: imageUrls,
    });
    return response.json(orders);
  }
}
