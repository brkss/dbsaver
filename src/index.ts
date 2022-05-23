import express from "express";

(() => {
  const app = express();

  app.listen(4000, () => {
    console.log("🚀 DBSAVER RUNNING ON : http://localhost:4000");
  });
})();
