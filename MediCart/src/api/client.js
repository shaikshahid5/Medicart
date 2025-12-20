import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080", // change later
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default client;
