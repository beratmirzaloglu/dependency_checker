import { Module } from '@nestjs/common';
import { DependencyCheckerModule } from './dependency-checker/dependency-checker.module';

@Module({
  imports: [DependencyCheckerModule],
})
export class AppModule {}
