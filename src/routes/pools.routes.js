import { Router } from "express";
import { 
    createPool, 
    getPools,
    getOptions,
    getResult
 } from "../controllers/pools.controller"

const router = Router();

router.post("/pool", createPool);
router.get("/pool", getPools);
router.get("/pool/:id/choice", getOptions);
router.get("/pool/:id/result", getResult);

export default router;