import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class Security {
    public verifyToken(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            res.status(401).json({
                response: "Security denied your petition. 3000 CIA officers are going to your house right now."
            });
        } else {
            try {
                const privateKey = String(process.env.ULTRA_SECRET_PASSWORD);
                const token = req.headers.authorization?.split(" ")[1] as string;
                const data = jwt.verify(token, privateKey)
                req.body.userData = data;
                next();
              } catch (e) {
                res.status(401).json({ respuesta: "You cheeky little bastard, you fraud. I've sent 500000 agents to get your ass you stupid cunt." });
              }
        }
    }
};

const security = new Security();
export default security;