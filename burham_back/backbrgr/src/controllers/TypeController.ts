import { Response, Request } from "express";
import TypeDAO from "../dao/TypeDao";

class TypeController extends TypeDAO {
  public consultOneType(req: Request, res: Response) {
    TypeController.consultType(req.params.code, res);
  }

  public consultAllTypes(req: Request, res: Response) {
    TypeController.consultTypeAndCount(res);
  }

  public createType(req: Request, res: Response): void {
    TypeController.createType(req.body, res);
  }

  public deleteType(req: Request, res: Response): void {
    TypeController.deleteType(req.params.code, res);
  }

  public updateType(req: Request, res: Response): void {
    TypeController.updateType(req.params.code, req.body, res);
  }
}

const typeController = new TypeController();
export default typeController;