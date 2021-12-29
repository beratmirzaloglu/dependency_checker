import { SoftwareLanguageNames } from '../../enums/software-language-names.enum';
import { ISoftwareLanguage } from '../../interfaces/software-language.interface';
import { PhpService } from './php.service';

export const PhpConfig: ISoftwareLanguage = {
  languageName: SoftwareLanguageNames.PHP,
  dependencyFileName: 'composer.json',
  registryUrl: 'https://packagist.org/p2',
  getDependencyList: PhpService.getDependencyList,
  findOutdatedDependencies: PhpService.findOutdatedDependencies,
};
