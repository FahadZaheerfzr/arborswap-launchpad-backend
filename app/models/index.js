const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.banner = require("./banner.model.js")(mongoose);
db.sale = require("./sale.model.js")(mongoose);
db.airdrop = require("./airdrop.model.js")(mongoose);
db.lock = require("./lock.model.js")(mongoose);

module.exports = db;