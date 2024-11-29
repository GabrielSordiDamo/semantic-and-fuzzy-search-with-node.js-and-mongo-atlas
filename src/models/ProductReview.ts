

import mongoose from "mongoose";

const ProductReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
    },
    text: {
        type: String,
    },
    title: {
        type: String,
    },
    username: {
        type: String,
    },
    vector: { type: [Number], required: false }
});

export const ProductReview = mongoose.model("ProductReview", ProductReviewSchema);
