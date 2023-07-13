"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConnectionDB = () => {
    const URL = String(process.env.URL_MONGO);
    (0, mongoose_1.connect)(URL)
        .then(() => {
        console.log("Neat connection", URL);
    })
        .catch((e) => {
        console.log(e);
    });
};
exports.default = ConnectionDB;
