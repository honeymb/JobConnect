import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});
const app = express();
const API = (api) => `/api/v1/${api}`;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Updated CORS Configuration
const corsOptions = {
    origin: 'https://jobconnect-hag.netlify.app', // Replace with frontend URL
    credentials: true, // Allow credentials (cookies, etc.)
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

const PORT = process.env.PORT || 8000;

// APIs
app.use(API('user'), userRoute);
app.use(API('company'), companyRoute);
app.use(API('job'), jobRoute);
app.use(API('application'), applicationRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
