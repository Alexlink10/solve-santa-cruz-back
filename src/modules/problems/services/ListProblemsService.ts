import { AppDataSource } from '@shared/typeorm/migrations/data-source';
import Problems from '@modules/problems/typeorm/entities/Problems';

class ListProblemsService {
  public async execute(): Promise<Problems[]> {
    const problemsRepository = AppDataSource.getRepository(Problems);

    const problems = await problemsRepository.find();
    return problems;
  }
}

export default ListProblemsService;
