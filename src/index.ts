import express from "express";
import { schedule } from "node-cron";

(() => {
  const app = express();

  schedule("32 * * * *", () => {
    console.log("cron job running !");
  });

  app.listen(4000, () => {
    console.log("🚀 DBSAVER RUNNING ON : http://localhost:4000");
  });
})();
