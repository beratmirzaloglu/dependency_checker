import { IGitProvider } from 'src/git-providers/interfaces/git-provider.interface';
import { GitProviderNames } from '../../enums/git-provider-names.enum';
import { GitlabService } from './gitlab.service';

export const GitlabConfig: IGitProvider = {
  gitProviderName: GitProviderNames.GITLAB,
  gitHostName: 'gitlab.com',
  gitProviderApiUrl: '',
  convertRepoUrlToApiReqUrl: GitlabService.convertRepoUrlToApiReqUrl,
  getRepositoryContent: GitlabService.getRepositoryContent,
  findRepositoryLanguage: GitlabService.findRepositoryLanguage,
  getDependencyFileContent: GitlabService.getDependencyFileContent,
};
