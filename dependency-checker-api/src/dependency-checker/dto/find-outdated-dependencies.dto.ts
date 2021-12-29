import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class FindOutdatedDependenciesDto {
  @IsNotEmpty()
  @IsUrl()
  repositoryUrl: string;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  emailList: string[];
}
