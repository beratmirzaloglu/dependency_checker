import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiHelper } from 'src/helpers/api.helper';
import { StaticFunctions } from 'src/helpers/static-functions.helper';
import { SoftwareLanguageConfigs } from 'src/software-languages/config';
import { ISoftwareLanguage } from 'src/software-languages/interfaces/software-language.interface';
import { DependencyFileContent } from 'src/types/dependency-file-content.type';
import { RepositoryContent } from 'src/types/repository-content.type';
import { GithubConfig } from './github.config';

export class GithubService {
  static convertRepoUrlToApiReqUrl(repositoryUrl: string): string {
    const url = StaticFunctions.convertToURL(repositoryUrl);
    // Split list by '/' and remove empty strings in it.
    const keys = url.pathname.split('/').filter((item) => item); // ["beratmirzaloglu","repo_name"]
    if (keys.length < 2)
      throw new HttpException(
        'Invalid repository url.',
        HttpStatus.BAD_REQUEST,
      );
    const [owner, repositoryName] = keys;
    const apiReqUrl = `${GithubConfig.gitProviderApiUrl}/repos/${owner}/${repositoryName}/contents`;
    return apiReqUrl;
  }

  static async getRepositoryContent(
    apiRequestUrl: string,
  ): Promise<RepositoryContent> {
    try {
      const response = await ApiHelper.get(apiRequestUrl);
      return response.data;
    } catch (error) {
      throw new HttpException('Invalid url.', HttpStatus.BAD_REQUEST);
    }
  }

  static findRepositoryLanguage(
    repositoryContent: RepositoryContent,
  ): ISoftwareLanguage {
    for (const item of repositoryContent) {
      for (const language of SoftwareLanguageConfigs) {
        if (item['name'] === language.dependencyFileName) {
          return language;
        }
      }
    }
    throw new HttpException(
      "This repository's language is not supported at the moment.",
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  static async getDependencyFileContent(
    repositoryContent: RepositoryContent,
    softwareLanguage: ISoftwareLanguage,
  ): Promise<DependencyFileContent> {
    const file = repositoryContent.find(
      (item) => item['name'] === softwareLanguage.dependencyFileName,
    );
    const result = await ApiHelper.get(file['download_url']);
    return result.data;
  }
}
