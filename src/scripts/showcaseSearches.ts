import { showcaseSemanticSearch } from "../services/showcaseSemanticSearchService";
import { showcaseFuzzySearch } from "../services/showcaseFuzzySearchService";
import dotenv from "dotenv";
import { connectDB } from "../config/connect";

dotenv.config();
const showcaseSearches = async () => {
  await connectDB();
  await showcaseSemanticSearch();
  await showcaseFuzzySearch();
  process.exit(0);
};

showcaseSearches();
