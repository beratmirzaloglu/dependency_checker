import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { IDependencies } from './interfaces/dependency.interface';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  prepareMailContent(
    repositoryUrl: string,
    dependencies: IDependencies,
  ): string {
    let mailString = `Repository url: ${repositoryUrl}\n\n`;

    mailString += 'Main dependencies:\n';
    dependencies.dependencies.forEach((d) => {
      mailString += `${d.name} : ${d.version}\n`;
    });
    mailString += '\nDev dependencies:\n';
    dependencies.devDependencies.forEach((d) => {
      mailString += `${d.name} : ${d.version}\n`;
    });

    return mailString;
  }

  async getOutdatedDependencies(repositoryUrl: string, emailList: string[]) {
    const result = await lastValueFrom(
      this.httpService.post(process.env.API_URL + '/dependency-checker', {
        repositoryUrl,
        emailList,
      }),
    );
    const outdatedDependencies: IDependencies = result.data;
    return outdatedDependencies;
  }
}
