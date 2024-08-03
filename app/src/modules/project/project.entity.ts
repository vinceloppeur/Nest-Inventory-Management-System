import { type ProjectUid } from 'app/modules/project/value-objects/project-uid.vo';
import { type ProjectName } from 'app/modules/project/value-objects/project-name.vo';

export class ProjectEntity {
  private project_uid: ProjectUid;
  private project_name: ProjectName;

  public constructor(project_uid: ProjectUid, project_name: ProjectName) {
    this.project_uid = project_uid;
    this.project_name = project_name;
  }

  public get_project_uid(): string {
    return this.project_uid.get_project_uid();
  }

  public get_project_name(): string {
    return this.project_name.get_project_name();
  }
}
