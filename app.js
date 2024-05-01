import express from "express";
import cors from "cors";
import contactRouter from "./routes/contactRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRouter);

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running");
});
