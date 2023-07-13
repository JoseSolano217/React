import DimentionEntity from "./DimentionEntity";
import TypeEntity from "./TypeEntity";

class BurgerEntity {
    public type: TypeEntity;
    public dimention: DimentionEntity;
    public value: number;

    constructor (nm: TypeEntity, em: DimentionEntity, pw: number) {
        this.type = nm;
        this.dimention = em;
        this.value = pw;
    }
}

export default BurgerEntity;