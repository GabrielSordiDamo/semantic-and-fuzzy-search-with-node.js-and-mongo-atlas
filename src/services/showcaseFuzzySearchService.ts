import { fuzzySearch } from "./fuzySearchService";
import { ProductReview } from "../models/ProductReview";
import { saveSearchToFile } from "../utils/saveSearchToFile";

export const showcaseFuzzySearch = async () => {
  const queries = [
    {
      query: "Nice. Great for the ",
      path: "text",
      maxEdits: 2,
      prefixLength: 2,
      maxExpansions: 50,
      limit: 10,
      minScore: 0.5,
      title: "Search for positive reviews",
      description:
        "Find reviews mentioning 'Nice. Great for the ' in the text field.",
    },
    {
      query: "As expected",
      path: "text",
      maxEdits: 2,
      prefixLength: 2,
      maxExpansions: 50,
      limit: 10,
      minScore: 0.5,
      title: "Search for reviews with expected outcomes",
      description:
        "Search for reviews where users describe their expectations as 'As expected'.",
    },
    {
      query: "Just batteries. Noth",
      path: "text",
      maxEdits: 2,
      prefixLength: 2,
      maxExpansions: 50,
      limit: 10,
      minScore: 0.5,
      title: "Search for reviews about basic batteries",
      description:
        "Find reviews mentioning 'Just batteries. Noth' in the text field.",
    },
    {
      query: "Ive been buying thes",
      path: "text",
      maxEdits: 2,
      prefixLength: 2,
      maxExpansions: 50,
      limit: 10,
      minScore: 0.5,
      title: "Search for repeat purchase mentions",
      description:
        "Search for reviews that indicate repeated purchases with phrases like 'Ive been buying thes'.",
    },
    {
      query: "Just started using t",
      path: "title",
      maxEdits: 2,
      prefixLength: 2,
      maxExpansions: 50,
      limit: 10,
      minScore: 0.5,
      title: "Search for recent usage mentions",
      description:
        "Find reviews mentioning 'Just started using t' in the title field.",
    },
    {
      query: "Battries long lastng",
      path: "text",
      maxEdits: 2,
      prefixLength: 2,
      maxExpansions: 50,
      limit: 10,
      minScore: 0.5,
      title: "Search for reviews with mistyped keywords",
      description:
        "Handle mistyped queries like 'Battries long lastng' to find reviews mentioning 'batteries long lasting'.",
    },
  ];

  const results = await Promise.all(
    queries.map(async (searchOptions) => {
      const results = await fuzzySearch(ProductReview, {
        ...searchOptions,
      });
      return { ...searchOptions, results };
    }),
  );

  const filePath = "fuzzy-search-results.json";
  await saveSearchToFile(results, filePath);
};
