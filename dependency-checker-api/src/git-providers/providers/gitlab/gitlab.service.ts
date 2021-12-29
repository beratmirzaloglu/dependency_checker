import { HttpException, HttpStatus } from '@nestjs/common';
import { ISoftwareLanguage } from 'src/software-languages/interfaces/software-language.interface';
import { DependencyFileContent } from 'src/types/dependency-file-content.type';
import { RepositoryContent } from 'src/types/repository-content.type';

export class GitlabService {
  static convertRepoUrlToApiReqUrl(): string {
    throw new HttpException(
      'Gitlab provider is not supported at the moment.',
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  static getRepositoryContent(): Promise<RepositoryContent> {
    throw new HttpException(
      'Gitlab provider is not supported at the moment.',
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  static findRepositoryLanguage(): ISoftwareLanguage {
    throw new HttpException(
      'Gitlab provider is not supported at the moment.',
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  static getDependencyFileContent(): Promise<DependencyFileContent> {
    throw new HttpException(
      'Gitlab provider is not supported at the moment.',
      HttpStatus.NOT_IMPLEMENTED,
    );
  }
}
