import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectService } from 'app/modules/project/project.service';
import { ProjectController } from 'app/modules/project/project.controller';
import { AuthModule } from 'app/modules/auth/auth.module';
import { ProjectSchema } from 'app/modules/project/project.schema';
import { ProjectRepository } from 'app/modules/project/project.repository';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ProjectSchema])],
  providers: [ProjectService, ProjectRepository],
  controllers: [ProjectController],
})
export class ProjectModule {}
