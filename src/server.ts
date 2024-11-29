import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/connect";
import express from "express";
import searchRoutes from "./routes/searchRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger";

connectDB();

const app = express();

app.use(express.json());
app.use("/search", searchRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
