export class ProjectUid {
  private uid: string;

  public constructor(param: string) {
    this.set_uid(param);
  }

  public get_project_uid(): string {
    return this.uid;
  }

  private set_uid(param: string): void {
    this.uid = param;
  }
}
