import {
  IDependencies,
  IDependency,
} from 'src/dependency-checker/interfaces/dependency.interface';
import { ApiHelper } from 'src/helpers/api.helper';
import { StaticFunctions } from 'src/helpers/static-functions.helper';
import { DependencyFileContent } from 'src/types/dependency-file-content.type';
import { NodeJsConfig } from './nodejs.config';

export class NodeJsService {
  static getDependencyList(
    dependencyFileContent: DependencyFileContent,
  ): IDependencies {
    const dependencyList: IDependencies = {
      dependencies: [],
      devDependencies: [],
    };

    // Fetching main dependencies
    for (const dependencyName in dependencyFileContent['dependencies']) {
      const versionNumber =
        dependencyFileContent['dependencies'][dependencyName];
      const dependency: IDependency = {
        name: dependencyName,
        version: versionNumber,
      };
      dependencyList.dependencies.push(dependency);
    }

    // Fetching development dependencies
    for (const dependencyName in dependencyFileContent['devDependencies']) {
      const versionNumber =
        dependencyFileContent['devDependencies'][dependencyName];
      const dependency: IDependency = {
        name: dependencyName,
        version: versionNumber,
      };
      dependencyList.devDependencies.push(dependency);
    }

    return dependencyList;
  }

  static async findOutdatedDependencies(
    dependencyList: IDependencies,
  ): Promise<IDependencies> {
    const outdatedDependencies: IDependencies = {
      dependencies: [],
      devDependencies: [],
    };

    outdatedDependencies.dependencies = await NodeJsService.compareVersions(
      dependencyList.dependencies,
    );
    outdatedDependencies.devDependencies = await NodeJsService.compareVersions(
      dependencyList.devDependencies,
    );

    return outdatedDependencies;
  }

  private static async compareVersions(dependencyList: IDependency[]) {
    const outdatedDependencies: IDependency[] = [];
    for (const index in dependencyList) {
      try {
        const dependency = dependencyList[index];
        const url = `${NodeJsConfig.registryUrl}/-/package/${dependency.name}/dist-tags`;
        const response = await ApiHelper.get(url);
        const packageDetails = response.data;

        const currentVersion = dependency.version.replace('^', '').split('.');
        const latestVersion = (packageDetails['latest'] as string).split('.');

        // if digits counts are not equal, make them equal
        if (latestVersion.length !== currentVersion.length) {
          StaticFunctions.makeVersionCodesSameLength(
            currentVersion,
            latestVersion,
          );
        }

        // Compare current version with latest version
        for (const i in currentVersion) {
          if (currentVersion[i] !== latestVersion[i]) {
            // Preparing string, for example: 8.0.0 --> 8.2.4
            const versionString = `${currentVersion.join(
              '.',
            )} --> ${latestVersion.join('.')}`;

            console.log(dependency.name + ' = ' + versionString);

            outdatedDependencies.push({
              name: dependency.name,
              version: versionString,
            });
            break;
          }
        }
      } catch (error) {
        console.log(
          `Failed to fetch latest version of ${dependencyList[index].name}`,
        );
        continue;
      }
    }

    return outdatedDependencies;
  }
}
