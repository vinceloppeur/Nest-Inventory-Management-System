import { type ProjectEntity } from 'app/modules/project/project.entity';

import { type Nullable } from 'app/lib/types/nullable';

export interface IProjectRepository {
  create_from_entity(entity: ProjectEntity): Promise<void>;

  find_entity_by_name(name: string): Promise<Nullable<ProjectEntity>>;

  find_entity_by_id(id: string): Promise<Nullable<ProjectEntity>>;

  generate_uid(): string;
}
