import "dotenv/config";
import express from "express";
import { schedule } from "node-cron";
import { Dropbox } from "dropbox";

const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN });

(() => {
  const app = express();

  dbx
    .filesListFolder({ path: "" })
    .then((response: any) => {
      console.log(response);
    })
    .catch((err: any) => {
      console.log("ERR => ", err);
    });

  schedule("32 * * * *", () => {
    console.log("cron job running !");
  });

  app.listen(4000, () => {
    console.log("🚀 DBSAVER RUNNING ON : http://localhost:4000");
  });
})();
