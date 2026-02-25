import axios from "axios";

const http = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});


http.interceptors.request.use(
  (config) => {
    console.log("Request Sent:", config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;