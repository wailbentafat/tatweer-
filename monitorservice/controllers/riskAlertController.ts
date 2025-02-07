import RiskAlert from "../models/RiskAlert";
import type { Request, Response } from "express";

export const getAllRiskAlerts = async (_req: Request, res: Response) => {
  try {
    const alerts = await RiskAlert.find();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching risk alerts", error });
  }
};
