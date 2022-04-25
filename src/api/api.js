import axios from "axios";

const baseURL = process.env.API_URL || "http://localhost:3500";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "cache-control": "no-cache",

    withCredentials: true,
  },
});

export default instance;
