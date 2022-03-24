import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

const storageRouter = Router();
storageRouter.use(login_required);

storageRouter.post("/upload/:user_id", async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const image_url = req.body.image_url ?? null;
        const updateValue = { image_url };
        const user = await userAuthService.setUser({ user_id, updateValue });

        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }

        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
});
