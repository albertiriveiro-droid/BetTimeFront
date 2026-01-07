import axios from "axios";

export const http = axios.create({
  baseURL:  "https://bettimeapi-hcaphugjhkabgack.westeurope-01.azurewebsites.net/api",
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});