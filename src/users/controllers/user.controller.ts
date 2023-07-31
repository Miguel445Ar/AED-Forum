import { Router } from "express";
import { UserService } from "../services/user.service";
import { HTTP_STATUS } from "../../shared/utils/http-status.enum";

const router: Router = Router();

router.post("/auth/sign-up", async (req, res) => {
    const response: [object, HTTP_STATUS] = await UserService.saveUser(req.body);
    res.status(response[1]).json(response[0]);
});

router.post("/auth/sign-in", async (req, res) => {
    const response: [object, HTTP_STATUS] = await UserService.logIn(req.body);
    res.status(response[1]).json(response[0]);
});

router.get("/verification/:token", async (req, res) => {
    const token: string = req.params.token;
    
});

export default router;