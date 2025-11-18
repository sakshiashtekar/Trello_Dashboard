import express from "express";
import trello from "../services/trello.js";

const router = express.Router();

// Create card
router.post("/", async (req, res) => {
  try {
    const { listId, name, desc } = req.body;

    const card = await trello.post("/cards", null, {
      params: { idList: listId, name, desc },
    });

    res.json(card.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update card
router.put("/:cardId", async (req, res) => {
  try {
    const { cardId } = req.params;
    const result = await trello.put(`/cards/${cardId}`, req.body);
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete card 
router.delete("/:cardId", async (req, res) => {
  try {
    const { cardId } = req.params;
    const result = await trello.put(`/cards/${cardId}`, {
      closed: true,
    });

    res.json({ success: true, card: result.data });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
