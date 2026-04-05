import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/migrations/data-source';
import Problems from '@modules/problems/typeorm/entities/Problems';
interface IRequest {
  id: string;
}

class DeleteProblemsService {
  public async execute({ id }: IRequest): Promise<void> {
    const ProblemsRepository = AppDataSource.getRepository(Problems);

    const problem = await ProblemsRepository.findOne({
      where: { id },
    });

    if (!problem) {
      throw new AppError('O produto não existe');
    }

    await ProblemsRepository.remove(problem);
  }
}

export default DeleteProblemsService;
