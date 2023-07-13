export class Mod {
  public code: number;
  public downloads: number;
  public name: string;
  public team: string;
  public state: boolean;
  public image: string;

  constructor(
    code: number,
    downloads: number,
    name: string,
    team: string,
    state: boolean,
    image: string
  ) {
    this.code = code;
    this.downloads = downloads;
    this.name = name;
    this.team = team;
    this.state = state;
    this.image = image;
  }
}
