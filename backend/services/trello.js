import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { TRELLO_KEY, TRELLO_TOKEN } = process.env;

const trello = axios.create({
  baseURL: "https://api.trello.com/1",
  params: {
    key: TRELLO_KEY,
    token: TRELLO_TOKEN,
  },
});

export default trello;
