import dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";

import express, { type Request, type Response } from "express";
const app = express();

import connectDB from "@/utils/db-connect";

app.use(process.env.ENVIRONMENT === "DEV" ? morgan("dev") : morgan("common"));

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
