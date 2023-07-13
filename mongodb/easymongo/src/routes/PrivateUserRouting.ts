import { Router } from "express";
import privateUserController from "../controllers/PrivateUserController";

class PrivateUserRouting {
    public ApiPrivateUserRoute: Router;

    constructor() {
        this.ApiPrivateUserRoute = Router();
        this.loadRoutes();
    }

    public loadRoutes(): void {
        this.ApiPrivateUserRoute.post("/create", privateUserController.create);

        this.ApiPrivateUserRoute.get("/everyone", privateUserController.consult);
        this.ApiPrivateUserRoute.get("/singular/:code", privateUserController.consultOne);
        this.ApiPrivateUserRoute.get("/everyone/:code", privateUserController.consultByProfile);
        this.ApiPrivateUserRoute.get("/ammount/:profileCode", privateUserController.profileAmmount);
        this.ApiPrivateUserRoute.delete("/delete/:code", privateUserController.delete);
        this.ApiPrivateUserRoute.put("/update/:code", privateUserController.update);
    }
}

const privateUserRouting = new PrivateUserRouting();
export default privateUserRouting.ApiPrivateUserRoute;