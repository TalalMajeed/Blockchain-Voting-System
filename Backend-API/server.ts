import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import otpRoute from "./routes/validateRoute";
import verifyRoute from "./routes/verifyRoute";
import adminRoute from "./routes/adminRoute";
dotenv.config();
dotenv.config({ path: ".env.local", override: true });

import indexRoute from "./routes/indexRoute";
import { connectMongo } from "./database/mongo";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(helmet());

const PORT = process.env.PORT || 5000;

app.use("/api/validate/otp", otpRoute);
app.use("/api/verify/otp", verifyRoute);
app.use("/api/verify/admin", adminRoute);
app.use("/", indexRoute);

connectMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
