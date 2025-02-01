/*import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
const session = require("express-session");
const otpRoutes = require("./routes/otp");
const verifyRoutes = require("./routes/verify-otp");
dotenv.config();

import indexRoute from "./routes/indexRoute";

const app = express();
app.use(cors({ origin: "http://localhost:3000", 
                credentials: true
}));
app.use(bodyParser.json());
app.use(helmet());

app.use(
    session({
      secret: "your_secret_key",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

const PORT = 5000;

app.use("/", indexRoute);
app.use("/api", otpRoutes);
app.use("/api", verifyRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
const session = require("express-session");
const { otpStore, router: otpRouter } = require("./routes/otp");
const verifyRoutes = require("./routes/verify-otp");
const verifyAdminRoutes = require("./routes/verify-admin");
dotenv.config({ path: ".env.local" });

import indexRoute from "./routes/indexRoute";

const app = express();

app.use(
  cors({ 
    origin: "http://localhost:3000", 
    credentials: true 
  })
);
app.use(express.json());
app.use(helmet());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const PORT = 5000;

app.use("/api", otpRouter);
app.use("/api", verifyRoutes);
app.use("/api", verifyAdminRoutes);

app.use("/", indexRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

