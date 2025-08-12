const db = require("../models");

const Sale = db.sale;
const Airdrop = db.airdrop;
const Lock = db.lock;

// GET /api/stats/overview
// Returns total counts of created sales, airdrops, and locks
exports.getOverviewTotals = async (req, res) => {
  try {
    const [totalSales, totalAirdrops, totalLocks] = await Promise.all([
      Sale.countDocuments({}),
      Airdrop.countDocuments({}),
      Lock.countDocuments({}),
    ]);

    res.send({ totalSales, totalAirdrops, totalLocks });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Failed to retrieve overview totals.",
    });
  }
};


