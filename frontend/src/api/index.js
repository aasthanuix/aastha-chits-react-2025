import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const fetchChitPlans = () => API.get("/chit-plans");

