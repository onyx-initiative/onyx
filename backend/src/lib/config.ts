import corsMiddleware from "cors";

export const CORS_CONFIG: corsMiddleware.CorsOptions = {
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    // Add specific orgins once deployed to production
    origin: "*",
    allowedHeaders: [
        'Content-Type',
        'Origin',
        'Accept'
    ]
};