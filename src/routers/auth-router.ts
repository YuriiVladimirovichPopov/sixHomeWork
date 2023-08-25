import { Response, Router } from "express";
import { userService } from "../domain/user-service";
import { sendStatus } from './send-status';
import { createUserValidation } from '../middlewares/validations/users.validation';
import { LoginInputType } from '../models/users/loginInputModel';
import { RequestWithBody } from "../types";

export const authRouter = Router ({})

authRouter.post('/login', /*createUserValidation,*/ async(req: RequestWithBody<LoginInputType>, res: Response) => {
    try {
    const checkResult = await userService.checkCredentials(req.body.loginOrEmail, req.body.password)
    if (!checkResult) {
        return res.sendStatus(sendStatus.UNAUTHORIZED_401)
    }
    return res.sendStatus(sendStatus.NO_CONTENT_204)
    } catch {
        return res.sendStatus(sendStatus.BAD_REQUEST_400)
    }
})