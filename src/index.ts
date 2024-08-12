import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import connectDB from "@/utils/db/db-connect";

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
