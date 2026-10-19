import { AppError } from '@/utils/error';
import type { ResumeRepository } from '../repository/resume';
import type { ResumePopulate } from '../model/resume';
import type { Resume } from '../model/resume';

interface ResumeSrv {
  resumeRepo: ResumeRepository;
}

export class ResumeService implements ResumeSrv {
  resumeRepo: ResumeRepository;
  constructor(resumeRepo: ResumeRepository) {
    this.resumeRepo = resumeRepo;
  }

  /**
   * Create new resume
   * */
  async createNewResume(
    resume: Resume,
    metaDetail?: Partial<ResumePopulate['meta'] & { id: string }>,
  ) {
    if (!resume) {
      throw new AppError('Resume data is missing', 'NOT_FOUND');
    }

    const res = await this.resumeRepo.createNewResume(resume, metaDetail);
    return res;
  }

  async getResumes() {
    const resume = await this.resumeRepo.getResumes();
    if (!resume) {
      return [];
    }
    return resume;
  }

  async getResumeById(id: string): Promise<ResumePopulate> {
    if (!id) {
      throw new AppError('Resume id is not provided');
    }

    const resume = await this.resumeRepo.getResumeById(id);
    if (!resume) {
      throw new AppError('Resume not found', 'NOT_FOUND');
    }
    return resume;
  }

  /**
   * Update resume by id
   * */
  async updateResume(id: string, resume: Partial<ResumePopulate>) {
    if (!id?.trim()) {
      throw new AppError('Resume id is missing');
    }
    if (!resume) return;

    let existingResume = await this.resumeRepo.getResumeById(id);
    if (!existingResume) {
      throw new AppError('Resume not found', 'NOT_FOUND');
    }

    // Make sure meta such title, description, template always fallback
    // to saved in the database, if not provided
    const meta = {
      ...resume.meta,
      title: resume.meta?.title || existingResume?.meta?.title,
      description:
        resume.meta?.description || existingResume?.meta?.description,
      template: resume.meta?.template || existingResume?.meta?.template,
      updatedAt: existingResume.meta.updatedAt,
      createdAt: existingResume.meta.createdAt,
    } satisfies ResumePopulate['meta'];
    resume.meta = meta;

    return await this.resumeRepo.updateResume(id, resume);
  }

  /**
   * Returns all resume's name and id
   */
  async resumeLookup() {
    const resumes = await this.resumeRepo.resumeLookup();
    if (!resumes) {
      return [];
    }
    return resumes;
  }

  async deleteResume(id: string) {
    if (!id?.trim()) {
      throw new AppError('Resume id is not provided', 'NOT_FOUND');
    }
    const checkResumeExist = await this.resumeRepo.getResumeById(id);
    if (!checkResumeExist) {
      throw new AppError('Resume not found', 'NOT_FOUND');
    }

    await this.resumeRepo.deleteResume(id);
  }

  async getResumesName(): Promise<
    Array<{ name: string | null; id: string } | null>
  > {
    const resumes = await this.resumeRepo.getResumesName();
    if (!resumes) {
      return [];
    }
    return resumes;
  }
}
