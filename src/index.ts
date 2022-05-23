import express from "express";
import { schedule } from "node-cron";
import { google } from 'googleapis';
import fs from 'fs';
import readline from 'readline';
import { SCOPES, TOKEN_PATH } from './default';

(() => {
  const app = express();

  schedule("32 * * * *", () => {
    console.log("cron job running !");
  });

  app.listen(4000, () => {
    console.log("🚀 DBSAVER RUNNING ON : http://localhost:4000");
  });
})();
