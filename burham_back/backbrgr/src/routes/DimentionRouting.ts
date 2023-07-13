import { Router } from "express";
import dimentionController from "../controllers/DimentionController";

class DimentionRouting {
    public apiDimentionRoute: Router;

    constructor() {
        this.apiDimentionRoute = Router();
        this.loadRoutes();
    }

    public loadRoutes(): void {
        this.apiDimentionRoute.get("/everyone", dimentionController.consultDimention);
        this.apiDimentionRoute.post("/create", dimentionController.createDimention);
        this.apiDimentionRoute.delete("/delete/:code", dimentionController.deleteDimention);
        this.apiDimentionRoute.put("/update/:code", dimentionController.updateDimention);
    }
}

const dimentionRouting = new DimentionRouting();
export default dimentionRouting.apiDimentionRoute;