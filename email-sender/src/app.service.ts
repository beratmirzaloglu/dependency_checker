import { Injectable } from '@nestjs/common';
import { IDependencies } from './interfaces/dependency.interface';

@Injectable()
export class AppService {
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
}
