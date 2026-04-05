import Problems from '../typeorm/entities/Problems';
import { AppDataSource } from '../../../shared/typeorm/migrations/data-source';

interface Irequest {
  name: string;
}

class CreateProblemsService {
  public async execute({ name }: Irequest): Promise<Problems> {
    const problemsRepository = AppDataSource.getRepository(Problems);

    const Problemss = problemsRepository.create({
      name,
    });
    await problemsRepository.save(Problemss);
    return Problemss;
  }
}

export default CreateProblemsService;
