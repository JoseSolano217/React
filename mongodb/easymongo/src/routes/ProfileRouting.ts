import { Router } from "express";
import profileController from "../controllers/ProfileController";

class ProfileRouting {
    public apiProfileRoute: Router;

    constructor() {
        this.apiProfileRoute = Router();
        this.loadRoutes();
    }

    public loadRoutes(): void {
        this.apiProfileRoute.get("/everyone", profileController.consultAllProfiles);
        this.apiProfileRoute.get("/singular/:code", profileController.consultOneProfile);
        this.apiProfileRoute.post("/create", profileController.createProfile);
        this.apiProfileRoute.delete("/delete/:code", profileController.deleteProfile);
        this.apiProfileRoute.put("/update/:code", profileController.updateProfile);
    }
}

const profileRouting = new ProfileRouting();
export default profileRouting.apiProfileRoute;