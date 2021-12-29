import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GitProviderConfigs } from 'src/git-providers/config';
import { IGitProvider } from 'src/git-providers/interfaces/git-provider.interface';
import { StaticFunctions } from 'src/helpers/static-functions.helper';
import { ISoftwareLanguage } from 'src/software-languages/interfaces/software-language.interface';
import { DependencyFileContent } from 'src/types/dependency-file-content.type';
import { RepositoryContent } from 'src/types/repository-content.type';
import { FindOutdatedDependenciesDto } from './dto/find-outdated-dependencies.dto';
import { ScheduleMailDto } from './dto/schedule-mail.dto';
import { IDependencies } from './interfaces/dependency.interface';

@Injectable()
export class DependencyCheckerService {
  constructor(@Inject('MAIL_SERVICE') private readonly client: ClientProxy) {}

  private gitProviderConfig: IGitProvider;
  private repositoryLanguage: ISoftwareLanguage;

  async findOutdatedDependencies(
    findOutdatedDependenciesDto: FindOutdatedDependenciesDto,
  ): Promise<IDependencies> {
    const { repositoryUrl } = findOutdatedDependenciesDto;

    this.gitProviderConfig = this.findGitProvider(repositoryUrl);

    const repositoryContent = await this.getRepositoryContent(repositoryUrl);

    this.repositoryLanguage =
      this.gitProviderConfig.findRepositoryLanguage(repositoryContent);

    const dependencyFileContent = await this.getDependencyFileContent(
      repositoryContent,
    );

    const dependencyList = this.repositoryLanguage.getDependencyList(
      dependencyFileContent,
    );

    const outdatedDependencyList =
      await this.repositoryLanguage.findOutdatedDependencies(dependencyList);

    return outdatedDependencyList;
  }

  private findGitProvider(repositoryUrl: string): IGitProvider {
    const url = StaticFunctions.convertToURL(repositoryUrl);
    const urlHost = url.host;

    for (const config of GitProviderConfigs) {
      if (urlHost.includes(config.gitHostName)) return config;
    }

    // Given URL doesn't exist in our configs
    throw new HttpException(
      "Your repository's git provider is not implemented.",
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  private async getRepositoryContent(
    repositoryUrl: string,
  ): Promise<RepositoryContent> {
    const apiRequestUrl =
      this.gitProviderConfig.convertRepoUrlToApiReqUrl(repositoryUrl);
    const content = await this.gitProviderConfig.getRepositoryContent(
      apiRequestUrl,
    );
    return content;
  }

  private async getDependencyFileContent(
    repositoryContent: RepositoryContent,
  ): Promise<DependencyFileContent> {
    const dependencyFileContent =
      await this.gitProviderConfig.getDependencyFileContent(
        repositoryContent,
        this.repositoryLanguage,
      );

    return dependencyFileContent;
  }

  scheduleMail(repositoryUrl: string, emailList: string[]): void {
    const delay = 24 * 60 * 60 * 1000; // 24 hours in miliseconds
    const nextDependencyCheckTimestamp = new Date().getTime() + delay;
    const scheduleMailContent: ScheduleMailDto = {
      repositoryUrl,
      emailList,
      nextDependencyCheckTimestamp,
    };
    this.client.emit('schedule_mail', scheduleMailContent);
  }
}
