import { IDependencies } from 'src/dependency-checker/interfaces/dependency.interface';
import { DependencyFileContent } from 'src/types/dependency-file-content.type';
import { SoftwareLanguageNames } from '../enums/software-language-names.enum';

export interface ISoftwareLanguage {
  languageName: SoftwareLanguageNames;
  dependencyFileName: string;
  registryUrl: string;
  getDependencyList(
    dependencyFileContent: DependencyFileContent,
  ): IDependencies;
  findOutdatedDependencies(
    dependencyList: IDependencies,
  ): Promise<IDependencies>;
}
