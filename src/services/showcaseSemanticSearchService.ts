import { semanticSearchService } from "./semanticSearchService";
import { generateEmbeddingsService } from "./generateEmbeddingsService";
import { ProductReview } from "../models/ProductReview";
import { saveSearchToFile } from "../utils/saveSearchToFile";

export const showcaseSemanticSearch = async () => {
  const queries = [
    {
      title: "Searching for Value",
      query: "affordable and reliable gadget",
      k: 10,
      context:
        "Finds products that are described as both affordable and reliable, focusing on budget-friendly items with good performance.",
    },
    {
      title: "Customer Feedback",
      query: "fast shipping and excellent packaging",
      k: 10,
      context:
        "Highlights customer reviews that praise delivery speed and packaging quality, which are critical for a positive shopping experience.",
    },
    {
      title: "High End Search",
      query: "luxury watch with premium materials",
      k: 10,
      context:
        "Targets premium and high-quality products, such as luxury watches with detailed craftsmanship and superior materials.",
    },
    {
      title: "Specific Use Case",
      query: "durable hiking boots for rugged trails",
      k: 10,
      context:
        "Searches for products specifically designed for demanding scenarios, such as hiking boots for rough outdoor terrains.",
    },
    {
      title: "Eco Friendly Search",
      query: "biodegradable and reusable kitchen products",
      k: 10,
      context:
        "Focuses on environmentally friendly kitchen products, appealing to users prioritizing sustainability and eco-conscious choices.",
    },
    {
      title: "Broad Product Search",
      query: "best tech accessories of 2023",
      k: 10,
      context:
        "Identifies trending or highly rated tech accessories for the current year, helping users discover recent innovations.",
    },
    {
      title: "Sentiment-Based Search",
      query: "terrible customer experience and defective items",
      k: 10,
      context:
        "Searches for negative reviews, allowing users to identify products with recurring issues or poor customer experiences.",
    },
    {
      title: "Feature Focused Search",
      query: "wireless headphones with noise cancellation",
      k: 10,
      context:
        "Finds products with specific features, such as noise-canceling wireless headphones, catering to users seeking high-tech solutions.",
    },
    {
      title: "Niche Search",
      query: "compact travel mug for long flights",
      k: 10,
      context:
        "Locates niche items tailored for specific needs, such as travel mugs designed for convenience on extended journeys.",
    },
    {
      title: "Emotionally Charged Feedback",
      query: "absolutely love this product!",
      k: 10,
      context:
        "Captures customer reviews with strong positive sentiments, signaling high satisfaction and product quality.",
    },
  ];

  const results = await Promise.all(
    queries.map(async (searchOptions) => {
      const results = await semanticSearchService(ProductReview, {
        queryEmbedding: (
          await generateEmbeddingsService([searchOptions.query])
        )[0],
        ...searchOptions,
      });
      return { ...searchOptions, results };
    }),
  );

  const filePath = "semantic-search-results.json";
  await saveSearchToFile(results, filePath);
};
