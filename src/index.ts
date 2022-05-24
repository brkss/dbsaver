import "dotenv/config";
import express from "express";
import { schedule } from "node-cron";
//import { Dropbox } from "dropbox";
//import fs from "fs";
//import path from "path";
import { createFileName } from "./file";
import { saveDockerSqlFile } from "./execute";

//const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });
/*
const readFl = (p: string): Buffer => {
  const res = fs.readFileSync(p);
  return res;
};
*/
const save = () => {
  const filename = createFileName();
  saveDockerSqlFile(filename);
  console.log("✅ DONE !");
};

(() => {
  const app = express();

  save();

  /*
  const fileconfig = {
    path: path.join(__dirname, "../test.txt"),
  };

  dbx
    .filesUpload({ path: "/test.txt", contents: readFl(fileconfig.path) })
    .then((res) => {
      console.log("res => ", res.result);
    })
    .catch((e) => {
      console.log("something went wrong trying to upload file : ", e);
    });

  readFl(path.join(__dirname, "../test.txt"));
*/
  schedule("32 * * * *", () => {
    console.log("cron job running !");
  });

  app.listen(4001, () => {
    console.log("🚀 DBSAVER RUNNING ON : http://localhost:4000");
  });
})();
