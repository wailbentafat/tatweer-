import express from "express";
import { getAllPackages, addPackage } from "../controllers/packageController";

const router = express.Router();

router.get("/", getAllPackages);
router.post("/", addPackage);

export default router;
