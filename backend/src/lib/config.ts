import corsMiddleware from "cors";

export const CORS_CONFIG: corsMiddleware.CorsOptions = {
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // Add specific orgins once deployed to production
    origin: "*",
  };