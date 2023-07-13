import Dimention from "./Dimention";
import Type from "./Type";

class Burger {
    public _id: string;
    public type: Type;
    public dimention: Dimention;
    public value: number;

    constructor (id: string, nm: Type, em: Dimention, pw: number) {
        this._id = id;
        this.type = nm;
        this.dimention = em;
        this.value = pw;
    }
}

export default Burger;