import { ProductReview } from "../models/ProductReview";
import { generateEmbeddingsService } from "./generateEmbeddingsService";

export const populateEmbeddings = async () => {
  const reviews = await ProductReview.find({
    $or: [{ vector: { $exists: false } }, { vector: { $size: 0 } }],
  });
  const batchSize = 10;
  console.log(`Embeddings missing for ${reviews.length}`);
  console.log(`Start embeddings process`);
  for (let i = 0; i < reviews.length; i += batchSize) {
    const remaining = reviews.length - i;
    console.log(
      `Processing batch: ${i / batchSize + 1}, Remaining records: ${remaining}`,
    );

    const batch = reviews.slice(i, i + batchSize);

    const texts = batch.map((review) => `${review.title} ${review.text}`);

    const vectors = await generateEmbeddingsService(texts);

    for (let j = 0; j < batch.length; j++) {
      batch[j].vector = vectors[j];
      await batch[j].save();
      console.log(`Generated embedding for review: ${batch[j]._id}`);
    }
  }
  console.log(`Embedding process finished, embedded ${reviews.length} items`);
};
