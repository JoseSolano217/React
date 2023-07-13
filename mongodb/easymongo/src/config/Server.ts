import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import ConnectionDB from "./ConnectionDB";

import ProfileRouting from "../routes/ProfileRouting";
import UserRouting from "../routes/UserRouting";
import PrivateUserRouting from "../routes/PrivateUserRouting";

class Server {
    public app: express.Application;

    constructor(){
        dotenv.config({ path: "variables.env" });
        ConnectionDB();
        this.app = express();
        this.loadConfig();
        this.loadRoutes();
    };

    public loadConfig(){
        this.app.set("PORT", process.env.PORT);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({limit: "20mb"}));
        this.app.use(express.urlencoded({extended:true}));
    };

    public loadRoutes(){
        this.app.use("/api/private/users", PrivateUserRouting);
        this.app.use("/api/private/profiles", ProfileRouting);
        this.app.use("/api/public/users", UserRouting);
    };

    public startBackend(){
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Server up n running at ", this.app.get("PORT"));
        });
    };
}

export default Server;