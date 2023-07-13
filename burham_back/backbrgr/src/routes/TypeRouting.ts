import { Router } from "express";
import typeController from "../controllers/TypeController";

class TypeRouting {
    public apiTypeRoute: Router;

    constructor() {
        this.apiTypeRoute = Router();
        this.loadRoutes();
    }

    public loadRoutes(): void {
        this.apiTypeRoute.get("/everyone", typeController.consultAllTypes);
        this.apiTypeRoute.get("/singular/:code", typeController.consultOneType);
        this.apiTypeRoute.post("/create", typeController.createType);
        this.apiTypeRoute.delete("/delete/:code", typeController.deleteType);
        this.apiTypeRoute.put("/update/:code", typeController.updateType);
    }
}

const typeRouting = new TypeRouting();
export default typeRouting.apiTypeRoute;