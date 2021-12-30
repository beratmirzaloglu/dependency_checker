import {
  IDependencies,
  IDependency,
} from 'src/dependency-checker/interfaces/dependency.interface';
import { ApiHelper } from 'src/helpers/api.helper';
import { StaticFunctions } from 'src/helpers/static-functions.helper';
import { DependencyFileContent } from 'src/types/dependency-file-content.type';
import { PhpConfig } from './php.config';

export class PhpService {
  static getDependencyList(
    dependencyFileContent: DependencyFileContent,
  ): IDependencies {
    const dependencyList: IDependencies = {
      dependencies: [],
      devDependencies: [],
    };

    // Fetching main dependencies
    for (const dependencyName in dependencyFileContent['require']) {
      const versionNumber = dependencyFileContent['require'][dependencyName];
      const dependency: IDependency = {
        name: dependencyName,
        version: versionNumber,
      };
      dependencyList.dependencies.push(dependency);
    }

    // Fetching development dependencies
    for (const dependencyName in dependencyFileContent['require-dev']) {
      const versionNumber =
        dependencyFileContent['require-dev'][dependencyName];
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

    outdatedDependencies.dependencies = await PhpService.compareVersions(
      dependencyList.dependencies,
    );
    outdatedDependencies.devDependencies = await PhpService.compareVersions(
      dependencyList.devDependencies,
    );

    return outdatedDependencies;
  }

  private static async compareVersions(dependencyList: IDependency[]) {
    const outdatedDependencies: IDependency[] = [];
    for (const index in dependencyList) {
      try {
        const dependency = dependencyList[index];
        const url = `${PhpConfig.registryUrl}/${dependency.name}.json`;
        const response = await ApiHelper.get(url);
        const packageDetails = response.data;

        // Remove ^ and ~ chars from current version for compare
        const currentVersion = dependency.version
          .replace('~', '')
          .replace('^', '')
          .split('.');

        // Remove v char from latest version for compare
        const latestVersion = (
          packageDetails['packages'][dependency.name][0]['version'] as string
        )
          .replace('v', '')
          .split('.');

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
