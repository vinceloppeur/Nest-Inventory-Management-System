export class ProjectName {
  private name: string;

  public constructor(param: string) {
    this.set_name(param);
  }

  public get_project_name(): string {
    return this.name;
  }

  private set_name(param: string): void {
    this.name = param;
  }
}
