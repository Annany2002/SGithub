import express from "express";
import { getRepos } from "../controllers/auth.repos.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/repos/:language", ensureAuthenticated, getRepos);

export default router;
