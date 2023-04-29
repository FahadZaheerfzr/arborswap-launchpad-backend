module.exports = app => {
    const banner = require("../controllers/banner.controller.js");

    var router = require("express").Router();

    // Create a new Banner
    router.post("/", banner.create);

    // Retrieve all Banners
    router.get("/", banner.findAll);

    // Retrieve a single Banner with id
    router.get("/:id", banner.findOne);

    // Update a Banner with id
    router.put("/:id", banner.update);

    // Delete a Banner with id
    router.delete("/:id", banner.delete);

    // Delete all Banners
    router.delete("/", banner.deleteAll);

    app.use('/api/banner', router);
};