import axios from "axios";
export const api = axios.create({
  // baseURL: `https://bhtwin.playnosys.live/api`,
  // baseURL: `http://localhost:7613/api`,
  baseURL: `/api`,
});
// export const host = "http://localhost:7613";
// export const host = "https://bhtwin.playnosys.live";
export const host = "/";
