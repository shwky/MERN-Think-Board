import axios from "axios";

const apiBaseUrl = axios.create({
    baseURL: "http://localhost:5001/api",
});

export default apiBaseUrl;