import express from "express";
import cors from "cors";
import contactsRouter from "./routes/contacts.js";

const app = express();

app.use(cors());

app.use("/api/contacts", contactsRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
