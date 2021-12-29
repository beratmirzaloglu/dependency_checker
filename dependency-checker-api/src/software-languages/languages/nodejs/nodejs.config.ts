import { SoftwareLanguageNames } from '../../enums/software-language-names.enum';
import { ISoftwareLanguage } from '../../interfaces/software-language.interface';
import { NodeJsService } from './nodejs.service';

export const NodeJsConfig: ISoftwareLanguage = {
  languageName: SoftwareLanguageNames.NODEJS,
  dependencyFileName: 'package.json',
  registryUrl: 'https://registry.npmjs.org',
  getDependencyList: NodeJsService.getDependencyList,
  findOutdatedDependencies: NodeJsService.findOutdatedDependencies,
};
