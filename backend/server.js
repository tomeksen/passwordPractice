import express from "express";
import cors from "cors";
import api from "./routes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
