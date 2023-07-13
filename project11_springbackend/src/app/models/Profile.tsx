class Profile {
    public _id: string;
    public profilename: string;
    public state: number;
    public userQuantity?: number;

    constructor (id: string, nm: string, st: number) {
        this._id = id;
        this.profilename = nm;
        this.state = st;
    }
};

export default Profile;