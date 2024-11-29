import { Model } from "mongoose";
import { pipelineBuilder } from "../utils/pipelineBuilder";

const indexName = "fuzzy_search_index";

const index = {
  mappings: {
    dynamic: false,
    fields: {
      text: {
        type: "string",
        analyzer: "lucene.standard",
      },
      title: {
        type: "string",
        analyzer: "lucene.standard",
      },
      username: {
        type: "string",
        analyzer: "lucene.standard",
      },
    },
  },
};

export interface FuzzySearchOptions {
  query: string;
  path: string | string[];
  maxEdits?: number;
  prefixLength?: number;
  maxExpansions?: number;
  limit?: number;
  minScore?: number;
}

export const fuzzySearch = async <T>(
  model: Model<T>,
  options: FuzzySearchOptions,
): Promise<T[]> => {
  const {
    query,
    path,
    maxEdits = 2,
    prefixLength = 0,
    maxExpansions = 100,
    limit,
    minScore,
  } = options;

  const pipeline = new pipelineBuilder();
  pipeline
    .addStage({
      $search: {
        index: indexName,
        text: {
          query,
          path,
          fuzzy: {
            maxEdits,
            prefixLength,
            maxExpansions,
          },
        },
      },
    })
    .addProject({
      rating: 1,
      text: 1,
      title: 1,
      username: 1,
    })
    .addFields({ score: { $meta: "searchScore" } })
    .addMatch({ score: { $gte: minScore } })
    .addLimit(limit)
    .addSort({ score: -1 });

  return await model.aggregate(pipeline.build()).exec();
};
