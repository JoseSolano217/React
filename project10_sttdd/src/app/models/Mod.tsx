export class Mod {
  public code: number;
  public downloads: number;
  public name: string;
  public team: number;
  public state: boolean;
  public image: string;
  public imageName: string;

  constructor(
    code: number,
    downloads: number,
    name: string,
    team: number,
    state: boolean,
    image: string,
    imageName: string
  ) {
    this.code = code;
    this.downloads = downloads;
    this.name = name;
    this.team = team;
    this.state = state;
    this.image = image;
    this.imageName = imageName;
  }
}
