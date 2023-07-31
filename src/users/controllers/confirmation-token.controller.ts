import { Router } from "express";
import { HTTP_STATUS } from "../../shared/utils/http-status.enum";
import { ConfirmationTokenService } from "../services/confirmation-token.service";

const router: Router = Router();

router.get("/account-verification/:token", async (req, res) => {
    // const token: string = req.params.token;
    // const result: [object, HTTP_STATUS] = await ConfirmationTokenService.updateConfirmationToken(token);
    // res.status(result[1]).json(result[0]);
})

export default router;