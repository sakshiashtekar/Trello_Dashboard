import express from "express";
import trello from "../services/trello.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// CREATE LIST (works!)
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const boardId = process.env.BOARD_ID;

    const result = await trello.post(`/boards/${boardId}/lists`, null, {
      params: { name },
    });

    res.json(result.data);
  } catch (err) {
    console.log("Create list error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to create list" });
  }
});

// DELETE LIST (close)
router.delete("/:listId", async (req, res) => {
  try {
    const { listId } = req.params;

    const result = await trello.put(`/lists/${listId}/closed`, {
      value: true,
    });

    res.json({ success: true, list: result.data });
  } catch (err) {
    console.log("Delete list error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to delete list" });
  }
});

export default router;
