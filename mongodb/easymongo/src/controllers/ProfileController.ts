import { Response, Request } from "express";
import ProfileDAO from "../dao/ProfileDao";

class ProfileController extends ProfileDAO {
  public consultOneProfile(req: Request, res: Response) {
    ProfileController.consultProfile(req.params.code, res);
  }

  public consultAllProfiles(req: Request, res: Response) {
    ProfileController.consultProfileAndCount(res);
  }

  public createProfile(req: Request, res: Response): void {
    ProfileController.createProfile(req.body, res);
  }

  public deleteProfile(req: Request, res: Response): void {
    ProfileController.deleteProfile(req.params.code, res);
  }

  public updateProfile(req: Request, res: Response): void {
    ProfileController.updateProfile(req.params.code, req.body, res);
  }
}

const profileController = new ProfileController();
export default profileController;