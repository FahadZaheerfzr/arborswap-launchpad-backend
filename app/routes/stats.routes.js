module.exports = (app) => {
  const stats = require("../controllers/stats.controller.js");

  const router = require("express").Router();

  // Overview totals
  router.get("/overview", stats.getOverviewTotals);

  app.use("/api/stats", router);
};


