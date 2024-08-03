import { Injectable } from '@nestjs/common';

import { type IProjectService } from 'app/modules/project/interfaces/project.service.interface';
import { ProjectEntity } from 'app/modules/project/project.entity';
import { type IProjectRepository } from 'app/modules/project/interfaces/project.repository.interface';
import { type CreateProjectDto } from 'app/modules/project/dtos/create-project.request.dto';
import { ProjectUid } from 'app/modules/project/value-objects/project-uid.vo';
import { ProjectName } from 'app/modules/project/value-objects/project-name.vo';
import { type Nullable } from 'app/lib/types/nullable';
import { ProjectAlreadyExistsException } from 'app/modules/project/exceptions/project-already-exists.exception';
import { ProjectRepository } from 'app/modules/project/project.repository';
import { type FindProjectByIdDto } from 'app/modules/project/dtos/find-project-by-id.request.dto';
import { ProjectDoesNotExistException } from 'app/modules/project/exceptions/project-does-not-exist.exception';
import { type CreatedProjectDto } from 'app/modules/project/dtos/created-project.response.dto';
import { type FoundProjectDto } from 'app/modules/project/dtos/found-project.response.dto';
import { CreatorUid } from 'app/modules/project/value-objects/creator-uid.vo';

@Injectable()
export class ProjectService implements IProjectService {
  private project_repository: IProjectRepository;

  public constructor(inventory_repository: ProjectRepository) {
    this.project_repository = inventory_repository;
  }

  public async create_project(
    request: CreateProjectDto,
    creator: string,
  ): Promise<CreatedProjectDto> {
    const existing: Nullable<ProjectEntity> =
      await this.project_repository.find_entity_by_name(request.name);

    if (existing !== null) {
      throw new ProjectAlreadyExistsException([
        'project with the same name already exists',
      ]);
    }

    const creator_uid: CreatorUid = new CreatorUid(creator);

    const gen: string = this.project_repository.generate_uid();
    const project_uid: ProjectUid = new ProjectUid(gen);

    const project_name: ProjectName = new ProjectName(request.name);

    const project: ProjectEntity = new ProjectEntity(
      creator_uid,
      project_uid,
      project_name,
    );

    await this.project_repository.create_from_entity(project);

    return {
      project_id: project.get_uid(),
      project_name: project.get_name(),
    };
  }

  public async find_project(
    request: FindProjectByIdDto,
  ): Promise<FoundProjectDto> {
    const project: Nullable<ProjectEntity> =
      await this.project_repository.find_entity_by_id(request);

    if (project === null) {
      throw new ProjectDoesNotExistException(['no project with the id found']);
    }

    return {
      project_id: project.get_uid(),
      project_name: project.get_name(),
    };
  }
}
