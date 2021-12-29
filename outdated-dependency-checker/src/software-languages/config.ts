import { ISoftwareLanguage } from './interfaces/software-language.interface';
import { NodeJsConfig } from './languages/nodejs/nodejs.config';
import { PhpConfig } from './languages/php/php.config';

export const SoftwareLanguageConfigs: ISoftwareLanguage[] = [
  NodeJsConfig,
  PhpConfig,
];
