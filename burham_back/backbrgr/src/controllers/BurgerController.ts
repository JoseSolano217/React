import { Request, Response } from 'express';
import BurgerDao from '../dao/BurgerDao';

class BurgerController extends BurgerDao {
    public create(req: Request, res: Response): void {
        const email = { email: req.body.email };
        BurgerController.createBurger(email, req.body);
    }

    public consult(req: Request, res: Response): void {
        BurgerController.consultBurgerAndCount(res);
    }

    public consultOne(req: Request, res: Response): void {
        BurgerController.consultBurger(req.params.code, res);
    }

    public delete(req: Request, res: Response): void {
        BurgerController.deleteBurger(req.params.code, res);
    }

    public update(req: Request, res: Response): void {
        BurgerController.updateBurger(req.params.code, req.body, res);
    }
}

const burgerController = new BurgerController();
export default burgerController;