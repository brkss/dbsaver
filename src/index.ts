import "dotenv/config";
import express from "express";
import { schedule } from "node-cron";
//import { Dropbox } from "dropbox";
//import fs from "fs";
//import path from "path";
import { createFileName, createFileConfig, readFile } from "./file";
import { saveDockerSqlFile } from "./execute";
import path from 'path'

//const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });
/*
const readFl = (p: string): Buffer => {
  const res = fs.readFileSync(p);
  return res;
};
*/
const save = () => {
  const filename = createFileName();
  // save mysql docker container  
  saveDockerSqlFile(filename);
  const buff = readFile(path.join(__dirname, `backup/${filename}`));
  const config = createFileConfig(filename, buff);

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
