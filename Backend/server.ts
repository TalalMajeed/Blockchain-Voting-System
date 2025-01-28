import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
const otpRoutes = require("./routes/otp");
dotenv.config();

import indexRoute from "./routes/indexRoute";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(helmet());
const PORT = 5000;

app.use("/", indexRoute);
app.use("/api", otpRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
