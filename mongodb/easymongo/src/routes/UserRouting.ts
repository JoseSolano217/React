import { Router } from "express";
import userController from "../controllers/UserController";

class UserRouting {
    public apiUserRoute: Router;

    constructor() {
        this.apiUserRoute = Router();
        this.loadRoutes();
    }

    public loadRoutes(): void {
        this.apiUserRoute.post("/login", userController.login);

        this.apiUserRoute.get("/everyone", userController.consultUser);
        this.apiUserRoute.post("/create", userController.createUser);
        this.apiUserRoute.delete("/delete/:code", userController.deleteUser);
        this.apiUserRoute.put("/update/:code", userController.updateUser);
    }
}

const userRouting = new UserRouting();
export default userRouting.apiUserRoute;