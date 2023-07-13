"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserEntity {
    constructor(nm, em, pw, us, dt, im, ua, pf) {
        this.username = nm;
        this.email = em;
        this.password = pw;
        this.userstate = us;
        this.creationDate = dt;
        this.imageName = im;
        this.userAvatar = ua;
        this.profileCode = pf;
    }
}
exports.default = UserEntity;
