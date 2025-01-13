import axios from "axios";

// Creating an instance of axios
const Api = axios.create({
  baseURL: "http://localhost:3000", // Your backend API URL
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data", // Adjust if needed for your backend
  },
});
// Add a request interceptor to include the token
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
export const registerUserApi = (data) =>
  Api.post("/api/user/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const loginUserApi = (data) =>
  Api.post("/api/user/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const addSongApi = (data) =>
  Api.post("/api/songs/add", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const searchSongsApi = (query) =>
  Api.get(`/api/songs/search`, {
    params: { query },
  });

export const getAllSongNamesApi = () => Api.get("/api/songs/names");

export const getSongByIdApi = (id) => Api.get(`/api/songs/${id}`);
