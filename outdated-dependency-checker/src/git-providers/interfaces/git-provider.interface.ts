import { ISoftwareLanguage } from 'src/software-languages/interfaces/software-language.interface';
import { DependencyFileContent } from 'src/types/dependency-file-content.type';
import { RepositoryContent } from 'src/types/repository-content.type';
import { GitProviderNames } from '../enums/git-provider-names.enum';

export interface IGitProvider {
  gitProviderName: GitProviderNames;
  gitHostName: string;
  gitProviderApiUrl: string;
  convertRepoUrlToApiReqUrl(repositoryUrl: string): string;
  getRepositoryContent(apiRequestUrl: string): Promise<RepositoryContent>;
  findRepositoryLanguage(
    repositoryContent: RepositoryContent,
  ): ISoftwareLanguage;
  getDependencyFileContent(
    repositoryContent: RepositoryContent,
    softwareLanguage: ISoftwareLanguage,
  ): Promise<DependencyFileContent>;
}
