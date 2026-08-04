import axios from "axios";

const api = axios.create({
  baseURL: "https://thinkboard.codewithmmd.ir/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
