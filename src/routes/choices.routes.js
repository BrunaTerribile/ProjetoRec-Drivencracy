import { Router } from "express";
import { createChoice, voteChoice } from "../controllers/choices.controller"

const router = Router();

router.post("/choice", createChoice);
router.post("/choice/:id/vote", voteChoice );

export default router;