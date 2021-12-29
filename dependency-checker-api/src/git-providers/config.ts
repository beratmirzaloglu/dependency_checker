import { IGitProvider } from './interfaces/git-provider.interface';
import { GithubConfig } from './providers/github/github.config';
import { GitlabConfig } from './providers/gitlab/gitlab.config';

export const GitProviderConfigs: IGitProvider[] = [GithubConfig, GitlabConfig];
