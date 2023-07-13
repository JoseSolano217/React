import { Request, Response } from 'express';
import PrivateUserDao from '../dao/PrivateUserDao';

class PrivateUserController extends PrivateUserDao {
    public create(req: Request, res: Response): void {
        const email = { email: req.body.email };
        PrivateUserController.createUser(email, req.body, res);
    }

    public consult(req: Request, res: Response): void {
        PrivateUserController.getUsers(res);
    }

    public consultOne(req: Request, res: Response): void {
        PrivateUserController.getOneUser(req.params.code, res);
    }

    public delete(req: Request, res: Response): void {
        PrivateUserController.deleteUser(req.params.code, res);
    }

    public update(req: Request, res: Response): void {
        PrivateUserController.updateUser(req.params.code, req.body, res);
    }

    public profileAmmount(req: Request, res: Response): void {
        PrivateUserController.ammountUsersProfile(req.params.profileCode, res);
    }

    public consultByProfile(req: Request, res: Response): void {
        PrivateUserController.getProfileUsers(req.params.profileCode, res);
    }
}

const privateUserController = new PrivateUserController();
export default privateUserController;