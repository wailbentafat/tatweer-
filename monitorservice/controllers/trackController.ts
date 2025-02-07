import Track from "../models/Track";
import type { Request, Response } from "express";

export const getAllTracks = async (_req: Request, res: Response) => {
  try {
    const tracks = await Track.find();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tracks", error });
  }
};

export const addTrack = async (req: Request, res: Response) => {
  try {
    const newTrack = new Track(req.body);
    await newTrack.save();
    res.json(newTrack);
  } catch (error) {
    res.status(500).json({ message: "Error adding track", error });
  }
};
