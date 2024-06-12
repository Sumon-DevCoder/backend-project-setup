"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
// parser
app.use((0, cors_1.default)());
app.use((0, express_1.default)());
// application route
// app.use("/api/v1");
// route
app.get("/", (req, res) => {
    res.send("backend server is running...");
});
exports.default = app;
