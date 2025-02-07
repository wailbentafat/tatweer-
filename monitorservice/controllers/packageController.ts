import Package from "../models/Package";
import type { Request, Response } from "express";

export const getAllPackages = async (_req: Request, res: Response) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages", error });
  }
};

export const addPackage = async (req: Request, res: Response) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.json(newPackage);
  } catch (error) {
    res.status(500).json({ message: "Error adding package", error });
  }
};
