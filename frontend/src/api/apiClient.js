import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5001/api", // backend URL
});

export default apiClient;
