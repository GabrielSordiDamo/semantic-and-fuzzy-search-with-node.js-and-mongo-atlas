import fs from "fs/promises";

export const saveSearchToFile = async (results: any[], filePath: string) => {
  await fs.writeFile(filePath, JSON.stringify(results, null, 2) + "\n", {
    encoding: "utf8",
  });
  console.log(`Search results successfully saved to ${filePath}`);
};
