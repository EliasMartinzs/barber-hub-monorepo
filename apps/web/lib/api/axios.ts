import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // você pode adicionar headers globais aqui
    config.headers = config.headers ?? {};

    // exemplo: tracking
    config.headers["X-App-Source"] = "nextjs";

    return config;
  },
  (error) => Promise.reject(error),
);

export type ApiError = {
  data: null;
  error: {
    message: string;
    status?: string;
  };
};

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    const normalizedError: ApiError = {
      data: null,
      error: {
        message:
          (error.response?.data as any)?.message ||
          error.message ||
          "Unexpected error",
        status: String(status),
      },
    };

    console.log(normalizedError);

    // EXEMPLO: tratamento global de auth
    if (status === 401) {
      // aqui você pode:
      // - limpar cache do react query
      // - redirecionar
      // - ou emitir evento global
      console.warn("Unauthorized - redirect login");
    }

    return Promise.reject(normalizedError);
  },
);
