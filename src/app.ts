import express from "express";
const app = express();
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";

// parser
app.use(cors());
app.use(express.json());

// application route
app.use("/api/v1", router);

// route
app.get("/", (req, res) => {
  res.send("backend server is running...");
});

// global error handler
app.use(globalErrorHandler);
// route not found
app.use(notFound);

export default app;
