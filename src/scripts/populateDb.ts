import { connectDB } from "../config/connect";
import { populateEmbeddings } from "../services/populateEmbeddingService";
import { populateDB } from "../services/populateServices";
import dotenv from "dotenv";

dotenv.config();
const populateDb = async () => {
  await connectDB();
  await populateDB();
  await populateEmbeddings();
  process.exit(0);
};

populateDb();
