/* vendors */
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { uuidv7 } from 'uuidv7';

/* interfaces */
import { type IProjectRepository } from 'app/modules/project/interfaces/project.repository.interface';

/* domain objects */
import { ProjectEntity } from 'app/modules/project/project.entity';
import { CreatorUid } from 'app/modules/project/value-objects/creator-uid.vo';
import { ProjectUid } from 'app/modules/project/value-objects/project-uid.vo';
import { ProjectName } from 'app/modules/project/value-objects/project-name.vo';

/* types */
import { type Nullable } from 'app/lib/types/nullable';

import {
  ProjectSchema,
  type Project,
} from 'app/modules/project/project.schema';

@Injectable()
export class ProjectRepository
  extends Repository<Project>
  implements IProjectRepository
{
  public constructor(data_source: DataSource) {
    super(ProjectSchema, data_source.createEntityManager());
  }

  public async create_from_entity(entity: ProjectEntity): Promise<void> {
    await this.createQueryBuilder()
      .insert()
      .into(ProjectSchema)
      .values({
        creator_id: entity.get_creator_uid(),
        project_id: entity.get_uid(),
        project_name: entity.get_name(),
      })
      .execute();
  }

  /*
    TODO: would be great to introduce a factory class here for the account..
    TODO: ..entity
   */
  public async find_entity_by_name(
    name: string,
  ): Promise<Nullable<ProjectEntity>> {
    const result: Nullable<Project> = await this.createQueryBuilder('Project')
      .select('Project')
      .where('Project.project_name = :project_name', { project_name: name })
      .getOne();

    if (result === null) {
      return null;
    }

    const creator_uid: CreatorUid = new CreatorUid(result.creator_id);

    const project_uid: ProjectUid = new ProjectUid(result.project_id);

    const project_name: ProjectName = new ProjectName(result.project_name);

    const project: ProjectEntity = new ProjectEntity(
      creator_uid,
      project_uid,
      project_name,
    );

    return project;
  }

  public async find_entity_by_id(
    creator: string,
    id: string,
  ): Promise<Nullable<ProjectEntity>> {
    const result: Nullable<Project> = await this.createQueryBuilder('Project')
      .select('Project')
      .where('Project.creator_id = :creator_id', { creator_id: creator })
      .andWhere('Project.project_id = :project_id', { project_id: id })
      .getOne();

    if (result === null) {
      return null;
    }

    const creator_uid: CreatorUid = new CreatorUid(result.creator_id);

    const project_uid: ProjectUid = new ProjectUid(result.project_id);

    const project_name: ProjectName = new ProjectName(result.project_name);

    const project: ProjectEntity = new ProjectEntity(
      creator_uid,
      project_uid,
      project_name,
    );

    return project;
  }

  public async delete_entity(creator: string, id: string): Promise<void> {
    await this.createQueryBuilder()
      .delete()
      .from(ProjectSchema)
      .where('creator_id = :creator_id', { creator_id: creator })
      .andWhere('project_id = :project_id', { project_id: id })
      .execute();
  }

  public generate_uid(): string {
    const gen: string = uuidv7();
    const uid: string = String().concat('INV-', gen);

    return uid;
  }
}
