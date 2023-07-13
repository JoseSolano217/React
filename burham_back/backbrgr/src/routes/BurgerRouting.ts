import { Router } from "express";
import burgerController from "../controllers/BurgerController";

class BurgerRouting {
    public ApiBurgerRoute: Router;

    constructor() {
        this.ApiBurgerRoute = Router();
        this.loadRoutes();
    }

    public loadRoutes(): void {
        this.ApiBurgerRoute.post("/create", burgerController.create);
        this.ApiBurgerRoute.get("/everyone", burgerController.consult);
        this.ApiBurgerRoute.get("/singular/:code", burgerController.consultOne);
        this.ApiBurgerRoute.delete("/delete/:code", burgerController.delete);
        this.ApiBurgerRoute.put("/update/:code", burgerController.update);
    }
}

const burgerRouting = new BurgerRouting();
export default burgerRouting.ApiBurgerRoute;