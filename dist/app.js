"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
// parser
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// application route
app.use("/api/v1", routes_1.default);
// route
app.get("/", (req, res) => {
    res.send("backend server is running...");
});
// global error handler
app.use(globalErrorhandler_1.default);
// route not found
app.use(notFound_1.default);
exports.default = app;
