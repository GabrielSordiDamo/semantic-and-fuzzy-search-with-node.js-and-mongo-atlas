import path from "path";
import { spawn } from "child_process";

export const generateEmbeddingsService = async (
  texts: string[],
): Promise<number[][]> => {
  return new Promise((resolve, reject) => {
    const embeddingPath = path.resolve(
      __dirname,
      "generateEmbeddingsService.py",
    );

    const pythonProcess = spawn("python", [embeddingPath]);

    pythonProcess.stdin.write(JSON.stringify(texts));
    pythonProcess.stdin.end();

    let output = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(
          new Error(`Python script exited with code ${code}: ${errorOutput}`),
        );
      } else {
        try {
          const embeddings = JSON.parse(output);
          resolve(embeddings);
        } catch (err: any) {
          reject(new Error(`Failed to parse Python output: ${err.message}`));
        }
      }
    });
  });
};
