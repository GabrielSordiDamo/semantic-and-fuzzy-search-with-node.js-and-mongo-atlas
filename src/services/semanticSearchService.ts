import { Model } from "mongoose";
import { pipelineBuilder } from "../utils/pipelineBuilder";

const indexName = "semantic_search_index";
const index = {
  mappings: {
    dynamic: false,
    fields: {
      vector: {
        type: "knnVector",
        dimensions: 384,
        similarity: "cosine",
      },
      text: {
        type: "string",
      },
      title: {
        type: "string",
      },
    },
  },
};

export interface SemanticSearchOptions {
  queryEmbedding: number[];
  k: number;
  limit?: number;
}

export const semanticSearchService = async <T>(
  model: Model<T>,
  options: SemanticSearchOptions,
): Promise<any[]> => {
  const { queryEmbedding, k } = options;

  const pipeline = new pipelineBuilder();
  pipeline
    .addStage({
      $search: {
        index: indexName,
        knnBeta: {
          vector: options.queryEmbedding,
          path: "vector",
          k: options.k,
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
    .addLimit(options.limit)
    .addSort({ score: -1 });

  return await model.aggregate(pipeline.build()).exec();
};
