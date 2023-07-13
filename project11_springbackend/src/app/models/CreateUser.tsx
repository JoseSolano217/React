class CreateUser {
    public username: string;
    public email: string;
    public password: string;

    constructor(nm: string, em: string, pw: string) {
        this.username = nm;
        this.email = em;
        this.password = pw;
    }
}

export default CreateUser;