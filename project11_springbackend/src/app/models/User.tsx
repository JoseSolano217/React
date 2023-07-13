import Profile from "./Profile";

class User {
  public _id: string;
  public username: string;
  public email: string;
  public password: string;
  public userstate: number;
  public creationDate: Date;
  public profileCode: Profile;
  public imageName: string;
  public userAvatar: string;

  constructor(
    id: string,
    nm: string,
    em: string,
    pw: string,
    dt: Date,
    st: number,
    im: string,
    av: string,
    cp: Profile
  ) {
    this._id = id;
    this.username = nm;
    this.email = em;
    this.password = pw;
    this.creationDate = dt;
    this.userstate = st;
    this.imageName = im;
    this.userAvatar = av;
    this.profileCode = cp;
  }
}

export default User;