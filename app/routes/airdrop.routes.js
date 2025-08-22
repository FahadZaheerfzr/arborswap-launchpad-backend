module.exports = app => {
  const airdrop = require("../controllers/airdrop.controller.js");
  const router = require("express").Router();

  // Create a new Airdrop
  router.post("/", airdrop.create);

  // Retrieve all Airdrops (optionally filtered by chainId)
  router.get("/", airdrop.findAll);

  router.get("/status", airdrop.getAllAirdropsByStatus);

  // Retrieve a single Airdrop by airdropAddress
  router.get("/:address", airdrop.findOne);

  // Update an Airdrop by airdropAddress
  router.put("/:address", airdrop.findByAddressAndUpdate);

  // Delete an Airdrop by airdropAddress
  router.delete("/:address", airdrop.delete);

  app.use('/api/airdrop', router);
};
