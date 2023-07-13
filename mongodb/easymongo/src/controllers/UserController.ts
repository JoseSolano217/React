import { Response, Request } from "express";
import UserDAO from "../dao/UserDao";

class UserController extends UserDAO {
  public login(req: Request, res: Response) {
    UserDAO.verify(req.body, res);
  }

  public consultUser(req: Request, res: Response) {
    UserController.consultUser(res);
  }

  public createUser(req: Request, res: Response): void {
    const email = { email: req.body.email };
    UserController.createUser(email, req.body, res);
  }

  public deleteUser(req: Request, res: Response): void {
    UserController.deleteUser(req.params.code, res);
  }

  public updateUser(req: Request, res: Response): void {
    UserController.updateUser(req.params.code, req.body, res);
  }
}

const userController = new UserController();
export default userController;