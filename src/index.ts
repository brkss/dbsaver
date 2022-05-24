import "dotenv/config";
import express from "express";
import { schedule } from "node-cron";
import { Dropbox } from "dropbox";
import { createFileName, createFileConfig, readFile } from "./file";
import { saveDockerSqlFile } from "./execute";
import path from "path";

const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });

const save = () => {
  const filename = createFileName();
  // save mysql docker container
  saveDockerSqlFile(filename);
  const buff = readFile(path.join(__dirname, `../backup/${filename}`));
  const config = createFileConfig(filename, buff);
  dbx
    .filesUpload({ path: config.dpxpath, contents: config.content })
    .then((res) => {
      console.log("res => ", res.result);
      console.log("✅ DONE !");
    })
    .catch((e) => {
      console.log("something went wrong trying to upload file : ", e);
    });
};

(() => {
  const app = express();

  schedule("56 * * * *", () => {
    save();
  });

  app.listen(4001, () => {
    console.log("🚀 DBSAVER RUNNING ON : http://localhost:4000");
  });
})();
