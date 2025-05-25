import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors()); //Enable Cross-Origin Resource Sharing

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
