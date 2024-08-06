/* vendors */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* modules */
import { AuthModule } from 'app/modules/auth/auth.module';

/* providers */
import { ProjectService } from 'app/modules/project/project.service';
import { ProjectRepository } from 'app/modules/project/project.repository';

/* controllers */
import { ProjectController } from 'app/modules/project/project.controller';
import { ProjectsController } from 'app/modules/project/projects.controller';

/* schemas */
import { ProjectSchema } from 'app/modules/project/project.schema';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ProjectSchema])],
  providers: [ProjectService, ProjectRepository],
  controllers: [ProjectController, ProjectsController],
})
export class ProjectModule {}
