"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const validateRoute_1 = __importDefault(require("./routes/validateRoute"));
const verifyRoute_1 = __importDefault(require("./routes/verifyRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
dotenv_1.default.config();
dotenv_1.default.config({ path: ".env.local", override: true });
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
const mongo_1 = require("./database/mongo");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
const PORT = process.env.PORT || 5000;
app.use("/api/validate/otp", validateRoute_1.default);
app.use("/api/verify/otp", verifyRoute_1.default);
app.use("/api/verify/admin", adminRoute_1.default);
app.use("/", indexRoute_1.default);
(0, mongo_1.connectMongo)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
});
