import { Request, Response } from 'express';
import CreateProblemsService from '../services/CreateProblemsService';
import ListProblemsService from '../services/ListProblemsService';
import DeleteProblemsService from '../services/DeleteProblemsService';

export default class OrdersController {
  public async index(request: Request, response: Response) {
    const listProblemsService = new ListProblemsService();
    const problems = await listProblemsService.execute();
    return response.json(problems);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createProblems = new CreateProblemsService();

    const problems = await createProblems.execute({
      name,
    });
    return response.json(problems);
  }

  public async delete(
    request: Request<{ id: string }>,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteProblems = new DeleteProblemsService();

    await deleteProblems.execute({ id });

    return response.status(204).send();
  }
}
