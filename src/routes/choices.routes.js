import { Router } from "express";
import { 
    createChoice,
    postVote
} from "../controllers/choices.controller.js"

const router = Router();

router.post("/choice", createChoice);
router.post("/choice/:id/vote", postVote);

export default router;