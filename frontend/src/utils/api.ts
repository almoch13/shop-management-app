import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

let getToken: () => string | null;
let refreshAuthToken: () => Promise<string | null>;

export const setTokenHandler = (
  getTokenFn: () => string | null,
  refreshTokenFn: () => Promise<string | null>
) => {
  getToken = getTokenFn;
  refreshAuthToken = refreshTokenFn;
};

api.interceptors.request.use(
  (config) => {
    const token = getToken?.();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshAuthToken
    ) {
      originalRequest._retry = true;
      const newToken = await refreshAuthToken();

      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export const createProduct = async (productData: any) => {
  const response = await api.post("/products", productData);
  return response.data;
};

export default api;
