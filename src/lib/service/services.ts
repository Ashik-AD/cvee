import { Repositories } from '../repository/repositories';
import { ResumeService } from './resume';

interface ServiceList {
  resumeSrv: ResumeService;
}

export class Services implements ServiceList {
  resumeSrv: ResumeService;

  constructor(repositories: Repositories) {
    this.resumeSrv = new ResumeService(repositories.resume);
  }
}
