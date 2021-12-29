import { IGitProvider } from 'src/git-providers/interfaces/git-provider.interface';
import { GitProviderNames } from '../../enums/git-provider-names.enum';
import { GithubService } from './github.service';

export const GithubConfig: IGitProvider = {
  gitProviderName: GitProviderNames.GITHUB,
  gitHostName: 'github.com',
  gitProviderApiUrl: 'https://api.github.com',
  convertRepoUrlToApiReqUrl: GithubService.convertRepoUrlToApiReqUrl,
  getRepositoryContent: GithubService.getRepositoryContent,
  findRepositoryLanguage: GithubService.findRepositoryLanguage,
  getDependencyFileContent: GithubService.getDependencyFileContent,
};
