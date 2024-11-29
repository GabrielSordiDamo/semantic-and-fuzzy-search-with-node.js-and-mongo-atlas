import express from "express";
import { generateEmbeddingsService } from "../services/generateEmbeddingsService";
import { semanticSearchService } from "../services/semanticSearchService";
import { ProductReview } from "../models/ProductReview";
import { fuzzySearch } from "../services/fuzySearchService";

const router = express.Router();

/**
 * @swagger
 * /search/semantic:
 *   post:
 *     summary: Perform a semantic search.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SearchRequest'
 *     responses:
 *       200:
 *         description: A list of search results.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Server error.
 */
router.post("/semantic", async (req: any, res: any) => {
  const { query, k = 5, limit = 10 } = req.body;
  if (!query || typeof query !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid query. Must be a non-empty string." });
  }
  try {
    const queryEmbedding = (await generateEmbeddingsService([query]))[0];

    const results = await semanticSearchService(ProductReview, {
      queryEmbedding,
      k,
      limit,
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error performing semantic search." });
  }
});

/**
 * @swagger
 * /search/fuzzy:
 *   post:
 *     summary: Perform a fuzzy search.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FuzzySearchRequest'
 *     responses:
 *       200:
 *         description: A list of search results.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Server error.
 */
router.post("/fuzzy", async (req: any, res: any) => {
  const {
    query,
    path = "text",
    maxEdits = 2,
    prefixLength = 1,
    maxExpansions = 100,
    limit = 10,
    minScore = 0,
  } = req.body;

  if (!query || typeof query !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid query. Must be a non-empty string." });
  }

  if (!path || (typeof path !== "string" && !Array.isArray(path))) {
    return res.status(400).json({
      error: "Invalid path. Must be a string or an array of strings.",
    });
  }

  try {
    const results = await fuzzySearch(ProductReview, {
      query,
      path,
      maxEdits,
      prefixLength,
      maxExpansions,
      limit,
      minScore,
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error performing fuzzy search." });
  }
});

export default router;
