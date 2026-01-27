"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = connectMongo;
const mongoose_1 = __importDefault(require("mongoose"));
let hasConnected = false;
async function connectMongo() {
    if (hasConnected)
        return;
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
        throw new Error("Missing required env var: MONGODB_URL");
    }
    await mongoose_1.default.connect(mongoUrl);
    hasConnected = true;
    mongoose_1.default.connection.on("disconnected", () => {
        hasConnected = false;
    });
}
