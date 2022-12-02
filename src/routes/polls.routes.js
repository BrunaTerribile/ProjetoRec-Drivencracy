import { Router } from "express";
import { 
    createPoll, 
    getPolls,
    getResult
 } from "../controllers/polls.controller.js"

const router = Router();

router.post("/poll", createPoll);
router.get("/poll", getPolls);
router.get("/poll/:id/result", getResult);

export default router;