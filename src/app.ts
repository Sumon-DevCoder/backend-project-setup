import express from "express";
const app = express();
import cors from "cors";

// parser
app.use(cors());
app.use(express());

// route
app.get("/", (req, res) => {
  res.send("backend server is running...");
});

export default app;
