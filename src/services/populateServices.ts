import csvParser from "csv-parser";
import { ProductReview } from "../models/ProductReview";
import fs from "fs";
import path from "path";

export const populateDB = async () => {
  const csvFilePath: string = path.resolve(
    __dirname,
    "../data/amazon-products-review.csv",
  );

  const documentCount = await ProductReview.countDocuments();
  if (documentCount) {
    console.log(
      "Populate skipped, only takes place when there is no record, found ",
      documentCount,
    );
    return;
  }

  const reviews: any[] = [];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row: any) => {
        reviews.push({
          rating: Number(row.rating),
          text: row.text,
          title: row.title,
          username: row.username,
        });
      })
      .on("end", async () => {
        try {
          if (reviews.length > 0) {
            await ProductReview.insertMany(reviews);
            console.log(
              `Database populated with ${reviews.length} product reviews`,
            );
          } else {
            console.log("No reviews to insert.");
          }
          resolve();
        } catch (err) {
          console.error("Error inserting data into the database:", err);
          reject(err);
        }
      })
      .on("error", (err) => {
        console.error("Error reading the CSV file:", err);
        reject(err);
      });
  });
};
