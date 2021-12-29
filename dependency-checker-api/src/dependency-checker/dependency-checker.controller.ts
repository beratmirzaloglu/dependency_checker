import { Body, Controller, Post } from '@nestjs/common';
import { IDependencies } from './interfaces/dependency.interface';
import { DependencyCheckerService } from './dependency-checker.service';
import { FindOutdatedDependenciesDto } from './dto/find-outdated-dependencies.dto';

@Controller('dependency-checker')
export class DependencyCheckerController {
  constructor(
    private readonly dependencyCheckerService: DependencyCheckerService,
  ) {}

  @Post()
  async findOutdatedDependencies(
    @Body() findOutdatedDependenciesDto: FindOutdatedDependenciesDto,
  ): Promise<IDependencies> {
    const outdatedDependencyList =
      await this.dependencyCheckerService.findOutdatedDependencies(
        findOutdatedDependenciesDto,
      );

    const { repositoryUrl, emailList } = findOutdatedDependenciesDto;

    if (emailList && emailList.length > 0) {
      this.dependencyCheckerService.scheduleMail(repositoryUrl, emailList);
    }

    return outdatedDependencyList;
  }
}
