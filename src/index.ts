import "dotenv/config";
import express from "express";
import { schedule } from "node-cron";
import { createFileName } from "./file";
import { saveDockerSqlFile } from "./execute";
import path from "path";
import { auth } from "./auth";
import { uploadFile } from "./drive";

const save = (auth: any) => {
  const filename = createFileName();
  // save mysql docker container
  saveDockerSqlFile(filename);
  const p = path.join(__dirname, `../backup/${filename}`);
  uploadFile(auth, filename, p);
};

(async () => {
  const app = express();

  // every day at 10 
  schedule("* * 10 * * *", async () => {
    const AuthClient = await auth();
    save(AuthClient);
  });

  app.listen(4001, () => {
    console.log("🚀 DBSAVER RUNNING ON : http://localhost:4000");
  });
})();
