import express from "express";
import trello from "../services/trello.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/default", async (req, res) => {
  try {
    const boardId = process.env.BOARD_ID;

    // Fetch all lists with their cards
    const response = await trello.get(`/boards/${boardId}/lists`, {
      params: { cards: "open" },
    });

    res.json({ lists: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch board" });
  }
});

export default router;
