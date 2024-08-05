/* vendors */
import { Injectable } from '@nestjs/common';

/* interfaces */
import { type IProjectService } from 'app/modules/project/interfaces/project.service.interface';
import { type IProjectRepository } from 'app/modules/project/interfaces/project.repository.interface';

/* providers */
import { ProjectRepository } from 'app/modules/project/project.repository';

/* domain objects */
import { ProjectEntity } from 'app/modules/project/project.entity';
import { CreatorUid } from 'app/modules/project/value-objects/creator-uid.vo';
import { ProjectUid } from 'app/modules/project/value-objects/project-uid.vo';
import { ProjectName } from 'app/modules/project/value-objects/project-name.vo';

/* types and DTOs */
import { type Nullable } from 'app/lib/types/nullable';

import { type CreateProjectDto } from 'app/modules/project/dtos/create-project.request.dto';
import { type CreatedProjectDto } from 'app/modules/project/dtos/created-project.response.dto';
import { type FindProjectByIdDto } from 'app/modules/project/dtos/find-project-by-id.request.dto';
import { type FoundProjectDto } from 'app/modules/project/dtos/found-project.response.dto';
import { type DeleteProjectDto } from 'app/modules/project/dtos/delete-project.request.dto';

/* exceptions */
import { ProjectAlreadyExistsException } from 'app/modules/project/exceptions/project-already-exists.exception';
import { ProjectDoesNotExistException } from 'app/modules/project/exceptions/project-does-not-exist.exception';

@Injectable()
export class ProjectService implements IProjectService {
  private project_repository: IProjectRepository;

  public constructor(inventory_repository: ProjectRepository) {
    this.project_repository = inventory_repository;
  }

  public async create_project(
    request: CreateProjectDto,
  ): Promise<CreatedProjectDto> {
    const existing: Nullable<ProjectEntity> =
      await this.project_repository.find_entity_by_name(request.name);

    if (existing !== null) {
      throw new ProjectAlreadyExistsException([
        'project with the same name already exists',
      ]);
    }

    const creator_uid: CreatorUid = new CreatorUid(request.user_id);

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
      await this.project_repository.find_entity_by_id(
        request.user_id,
        request.project_id,
      );

    if (project === null) {
      throw new ProjectDoesNotExistException(['no project with the id found']);
    }

    return {
      project_id: project.get_uid(),
      project_name: project.get_name(),
    };
  }

  public async delete_project(request: DeleteProjectDto): Promise<void> {
    const existing: Nullable<ProjectEntity> =
      await this.project_repository.find_entity_by_id(
        request.user_id,
        request.project_id,
      );

    if (existing === null) {
      throw new ProjectDoesNotExistException(['no project with the id found']);
    }

    await this.project_repository.delete_entity(
      request.user_id,
      request.project_id,
    );
  }
}
