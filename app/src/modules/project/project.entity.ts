import { type CreatorUid } from 'app/modules/project/value-objects/creator-uid.vo';
import { type ProjectUid } from 'app/modules/project/value-objects/project-uid.vo';
import { type ProjectName } from 'app/modules/project/value-objects/project-name.vo';

export class ProjectEntity {
  private creator_uid: CreatorUid;
  private project_uid: ProjectUid;
  private project_name: ProjectName;

  public constructor(
    creator_uid: CreatorUid,
    project_uid: ProjectUid,
    project_name: ProjectName,
  ) {
    this.creator_uid = creator_uid;
    this.project_uid = project_uid;
    this.project_name = project_name;
  }

  public get_creator_uid(): string {
    return this.creator_uid.get_creator_uid();
  }

  public get_uid(): string {
    return this.project_uid.get_project_uid();
  }

  public get_name(): string {
    return this.project_name.get_project_name();
  }
}
