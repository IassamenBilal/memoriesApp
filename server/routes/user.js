import express from "express";
const router = express.Router();
import userCtrl from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

router.post("/api/users/register", userCtrl.register);
router.post("/api/users/login", userCtrl.login);
router.get("/api/user", auth, userCtrl.getUser);

export default router;
