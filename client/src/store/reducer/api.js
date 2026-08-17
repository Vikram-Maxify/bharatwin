import axios from "axios";
export const api = axios.create({
  baseURL: `https://1xclube.com/api`,
  // baseURL: `http://localhost:7613/api`,
  // baseURL: `/api`,
});
// export const host = "http://localhost:7613";
export const host = "https://1xclube.com";
// export const host = "/";
