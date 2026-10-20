import { AppError } from '@/utils/error';
import { Repositories } from '../repository/repositories';
import { ResumeService } from './resume';

interface ServiceList {
  resumeSrv: ResumeService;
}

export class Services implements ServiceList {
  resumeSrv: ResumeService;

  constructor(repositories: Repositories | undefined) {
    if (!repositories) throw new AppError('repository is required');
    this.resumeSrv = new ResumeService(repositories.resume);
  }
}
