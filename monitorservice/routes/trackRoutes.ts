import express from "express";
import { getAllTracks, addTrack } from "../controllers/trackController";

const router = express.Router();

router.get("/", getAllTracks);
router.post("/", addTrack);

export default router;
