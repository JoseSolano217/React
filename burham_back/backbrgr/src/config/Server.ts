import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import ConnectionDB from "./ConnectionDB";

import TypeRouting from "../routes/TypeRouting";
import DimentionRouting from "../routes/DimentionRouting";
import BurgerRouting from "../routes/BurgerRouting";

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
        this.app.use("/api/burgers", BurgerRouting);
        this.app.use("/api/types", TypeRouting);
        this.app.use("/api/dimentions", DimentionRouting);
    };

    public startBackend(){
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Server up n running at ", this.app.get("PORT"));
        });
    };
}

export default Server;