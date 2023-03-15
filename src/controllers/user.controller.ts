import { Router } from "express";
import { UserService } from "../services/user.service";

const router: Router = Router();

router.post("/sign-up", async (req, res) => {
    await UserService.saveUser(req.body);
    res.send("Sign up service is not available yet");
});

router.post("/sign-in", async (req, res) => {
    res.send("Sign in service is not available yet");
})

export default router;