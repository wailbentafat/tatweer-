import express from "express";
import { getAllRiskAlerts } from "../controllers/riskAlertController";

const router = express.Router();

router.get("/", getAllRiskAlerts);

export default router;
