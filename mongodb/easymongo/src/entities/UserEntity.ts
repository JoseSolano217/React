import ProfileEntity from "./ProfileEntity";

class UserEntity {
    public username: string;
    public email: string;
    public password: string;
    public userstate: number;
    public creationDate: Date;
    public imageName: string;
    public userAvatar: string;
    public profileCode: ProfileEntity;

    constructor (nm: string, em: string, pw: string, us: number, dt: Date, im: string, ua: string, pf: ProfileEntity) {
        this.username = nm;
        this.email = em;
        this.password = pw;
        this.userstate = us;
        this.creationDate = dt;
        this.imageName = im;
        this.userAvatar = ua;
        this.profileCode = pf;
    }
}

export default UserEntity;