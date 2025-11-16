import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { TRELLO_KEY, TRELLO_TOKEN, BOARD_ID, WEBHOOK_URL } = process.env;

async function createWebhook() {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/webhooks/?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`,
      {
        description: "Trello-Like App Webhook",
        callbackURL: WEBHOOK_URL,
        idModel: BOARD_ID,
      }
    );
    console.log("Webhook created:", response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

createWebhook();
