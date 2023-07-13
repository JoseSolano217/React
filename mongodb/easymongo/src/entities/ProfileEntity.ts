class ProfileEntity {
    public profilename: string;
    public state: number;

    constructor (nm: string, st: number) {
        this.profilename = nm;
        this.state = st;
    }
}

export default ProfileEntity;