module.exports = app => {
    const sale = require("../controllers/sale.controller.js");

    var router = require("express").Router();

    // Create a new Sale
    router.post("/", sale.create);

    // Retrieve all Sales
    router.get("/", sale.findAll);

    // Retrieve a single Sale with id
    router.get("/:id", sale.findOne);

    // Update a Sale with id
    router.put("/:id", sale.findByIdAndUpdate);

    // Delete a Sale with id
    router.delete("/:id", sale.delete);

    app.use('/api/sale', router);
};