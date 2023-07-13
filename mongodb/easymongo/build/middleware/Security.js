"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Security {
    verifyToken(req, res, next) {
        var _a;
        if (!req.headers.authorization) {
            res.status(401).json({
                response: "Security denied your petition. 3000 CIA officers are going to your house right now."
            });
        }
        else {
            try {
                const privateKey = String(process.env.ULTRA_SECRET_PASSWORD);
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                const data = jsonwebtoken_1.default.verify(token, privateKey);
                req.body.userData = data;
                next();
            }
            catch (e) {
                res.status(401).json({ respuesta: "You cheeky little bastard, you fraud. I've sent 500000 agents to get your ass you stupid cunt." });
            }
        }
    }
}
;
const security = new Security();
exports.default = security;
