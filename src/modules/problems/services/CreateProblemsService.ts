import Problems from '@modules/problems/typeorm/entities/Problems';
import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/migrations/data-source';

interface Irequest {
  name: string;
}

class CreateProblemsService {
  public async execute({ name }: Irequest): Promise<Problems> {
    const problemsRepository = AppDataSource.getRepository(Problems);

    const problemExixt = await problemsRepository.findOne({
      where: { name },
    });

    if (problemExixt) {
      throw new AppError('NOme já cadastrado');
    }

    const Problemss = problemsRepository.create({
      name,
    });
    await problemsRepository.save(Problemss);
    return Problemss;
  }
}

export default CreateProblemsService;
