const db = require('../models');
const Airdrop = db.airdrop;

// Create and Save a new Airdrop
exports.create = async (req, res) => {
    try {
        if (!req.body.airdrop || !req.body.airdrop.airdropAddress) {
            return res.status(400).send({ message: 'Airdrop address is required!' });
        }

        // Check if an airdrop with the same airdropAddress already exists
        const existing = await Airdrop.findOne({ "airdrop.airdropAddress": req.body.airdrop.airdropAddress });
        if (existing) {
            return res.status(409).send({ message: 'Airdrop with this address already exists.' });
        }

        const airdrop = new Airdrop({
            airdrop: req.body.airdrop,
            visible: req.body.visible !== undefined ? req.body.visible : true,
            isFinished: req.body.isFinished !== undefined ? req.body.isFinished : false,
            removed: req.body.removed !== undefined ? req.body.removed : false,
            isCancelled: req.body.isCancelled !== undefined ? req.body.isCancelled : false,
            chainId: req.body.chainId
        });

        const data = await airdrop.save();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Airdrop.',
        });
    }
};

// Retrieve all Airdrops from the database
exports.findAll = (req, res) => {
    let { chainId } = req.query;
    chainId = parseInt(chainId);
    const filter = { removed: false };
    if (chainId) {
        filter.chainId = chainId;
    }
    Airdrop.find(filter)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving airdrops.',
        });
      });
};

// Find a single Airdrop by airdropAddress
exports.findOne = (req, res) => {
    const address = req.params.address;

    Airdrop.findOne({ "airdrop.airdropAddress": address })
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: 'Not found Airdrop with address ' + address });
            }
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Error retrieving Airdrop with address=' + address });
        });
};

// Update an Airdrop by airdropAddress
exports.findByAddressAndUpdate = (req, res) => {
    const address = req.params.address;
    const updateData = req.body;

    Airdrop.findOneAndUpdate(
        { "airdrop.airdropAddress": address },
        updateData,
        { new: true }
    )
        .then(updatedAirdrop => {
            if (!updatedAirdrop) {
                return res.status(404).send({
                    message: `Airdrop with address ${address} not found.`,
                });
            }
            res.send(updatedAirdrop);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error updating Airdrop with address ${address}.`,
            });
        });
};

// Delete an Airdrop with the specified airdropAddress in the request
exports.delete = (req, res) => {
    const address = req.params.address;

    Airdrop.findOneAndRemove({ "airdrop.airdropAddress": address })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Airdrop with address=${address}. Maybe Airdrop was not found!`,
                });
            } else {
                res.send({
                    message: 'Airdrop was deleted successfully!',
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Airdrop with address=' + address,
            });
        });
};
