import { Response, Request } from "express";
import DimentionDAO from "../dao/DimentionDao";

class DimentionController extends DimentionDAO {

  public consultDimention(req: Request, res: Response) {
    DimentionController.consultDimentionAndCount(res);
  }

  public createDimention(req: Request, res: Response): void {
    const email = { email: req.body.email };
    DimentionController.createDimention(email, req.body);
  }

  public deleteDimention(req: Request, res: Response): void {
    DimentionController.deleteDimention(req.params.code, res);
  }

  public updateDimention(req: Request, res: Response): void {
    DimentionController.updateDimention(req.params.code, req.body, res);
  }
}

const dimentionController = new DimentionController();
export default dimentionController;