import express from "express";
import { getLikes, getUser, likeProfile } from "../controllers/auth.user.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile/:username", getUser);

router.post("/like/:username", ensureAuthenticated, likeProfile);

router.post("/likes", ensureAuthenticated, getLikes);

export default router;
