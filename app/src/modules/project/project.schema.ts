import { EntitySchema } from 'typeorm';

export interface Project {
  creator_id: string;
  project_id: string;
  project_name: string;
}

export const ProjectSchema = new EntitySchema<Project>({
  name: 'Project',
  columns: {
    creator_id: {
      nullable: false,
      type: 'varchar',
      length: 128,
    },
    project_id: {
      primary: true,
      type: 'varchar',
      length: 128,
    },
    project_name: {
      unique: true,
      nullable: false,
      type: 'varchar',
      length: '64',
    },
  },
});
