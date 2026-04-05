import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ListOrdersService from '../services/ListOrdersService';

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
    });
    return response.json(orders);
  }
}
