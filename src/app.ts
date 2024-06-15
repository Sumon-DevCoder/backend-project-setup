import express from "express";
const app = express();
import cors from "cors";
import router from "./app/routes";

// parser
app.use(cors());
app.use(express());

// application route
app.use("/api/v1", router);

// route
app.get("/", (req, res) => {
  res.send("backend server is running...");
});

export default app;
