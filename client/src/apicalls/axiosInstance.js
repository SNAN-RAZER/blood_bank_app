import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("blood_bank_token")}`,
  },
});
