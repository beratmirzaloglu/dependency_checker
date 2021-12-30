import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class FindOutdatedDependenciesDto {
  @IsNotEmpty()
  @IsUrl()
  repositoryUrl: string;

  @IsOptional()
  @IsEmail({}, { each: true })
  @IsArray()
  emailList: string[];
}
