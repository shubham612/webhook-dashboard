import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/webhook_service";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    console.log("API Request:", {
      url: config.url,
      method: config.method,
      data: config.data,
      params: config.params,
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.data);

    return response;
  },
  (error) => {
    console.error("API Error:", error);

    return Promise.reject(error);
  }
);

export default apiClient;
