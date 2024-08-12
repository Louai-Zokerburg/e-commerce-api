import dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";

import express, { type Request, type Response } from "express";
const app = express();

import rateLimit from "express-rate-limit";
import connectDB from "@/utils/db-connect";
import xssClean from "xss-clean";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

// Logging
app.use(process.env.ENVIRONMENT === "DEV" ? morgan("dev") : morgan("common"));

// Rate Limiting
app.set("trust proxy", 1);
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 60,
	}),
);

// Security
app.use(helmet());
app.use(cors());
app.use(xssClean());
app.use(mongoSanitize());

// json body and cookie parser
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req: Request, res: Response) => {
	res.send("Hello there");
});

const port = process.env.PORT || 3000;
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI || "");
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`),
		);
	} catch (error) {
		console.log(error);
	}
};

start();
