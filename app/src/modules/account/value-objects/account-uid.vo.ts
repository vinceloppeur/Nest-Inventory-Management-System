export class AccountUidVo {
  private uid: string;

  public constructor(uid: string) {
    this.set_uid(uid);
  }

  public get_uid(): string {
    return this.uid;
  }

  private set_uid(param: string): void {
    return void (this.uid = param);
  }
}
