"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const ConnectionDB_1 = __importDefault(require("./ConnectionDB"));
const ProfileRouting_1 = __importDefault(require("../routes/ProfileRouting"));
const UserRouting_1 = __importDefault(require("../routes/UserRouting"));
const PrivateUserRouting_1 = __importDefault(require("../routes/PrivateUserRouting"));
class Server {
    constructor() {
        dotenv_1.default.config({ path: "variables.env" });
        (0, ConnectionDB_1.default)();
        this.app = (0, express_1.default)();
        this.loadConfig();
        this.loadRoutes();
    }
    ;
    loadConfig() {
        this.app.set("PORT", process.env.PORT);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json({ limit: "20mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    ;
    loadRoutes() {
        this.app.use("/api/private/users", PrivateUserRouting_1.default);
        this.app.use("/api/private/profiles", ProfileRouting_1.default);
        this.app.use("/api/public/users", UserRouting_1.default);
    }
    ;
    startBackend() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Server up n running at ", this.app.get("PORT"));
        });
    }
    ;
}
exports.default = Server;
