import { Router } from "express";
import { UserService } from "../services/user.service";
import { HTTP_STATUS } from "../utils/http-status.enum";

const router: Router = Router();

router.post("/sign-up", async (req, res) => {
    const response: [object, HTTP_STATUS] = await UserService.saveUser(req.body);
    res.status(response[1]).json(response[0]);
});

router.post("/sign-in", async (req, res) => {
    res.send("Sign in service is not available yet");
})

export default router;