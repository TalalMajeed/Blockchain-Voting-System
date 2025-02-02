import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import otpRoute from "./routes/validateRoute.ts";
import verifyRoute from "./routes/verifyRoute.ts";
import adminRoute from "./routes/adminRoute.ts";
dotenv.config({ path: ".env.local" });

import indexRoute from "./routes/indexRoute.ts";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());

const PORT = 5000;

app.use("/api/validate/otp", otpRoute);
app.use("/api/verify/otp", verifyRoute);
app.use("/api/verify/admin", adminRoute);
app.use("/", indexRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
