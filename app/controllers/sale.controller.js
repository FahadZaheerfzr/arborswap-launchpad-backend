const db = require ('../models');
const Sale = db.sale;

// Create and Save a new Sale
exports.create = (req, res) => {
    console.log ('req.body', req.body);

    console.log ('req.body.sale', req.body.sale);
    // Validate request
    if (req.body.sale === undefined) {
        res.status (400).send ({message: 'Content can not be empty!'});
        return;
    }

    // Create a Sale
    const sale = new Sale ({
        sale: req.body.sale,
        visible: req.body.visible ? req.body.visible : true,
    });

    // Save Sale in the database
    sale
        .save (sale)
        .then (data => {
            res.send (data);
        })
        .catch (err => {
            res.status (500).send ({
                message:
                    err.message || 'Some error occurred while creating the Sale.',
            });
        });
}

// Retrieve all Sales from the database.
exports.findAll = (req, res) => {
    const saleId = req.query.saleId;
    var condition = saleId
        ? {saleId: {$regex: new RegExp (saleId), $options: 'i'}}
        : {};

    Sale.find (condition)
        .then (data => {
            res.send (data);
        })
        .catch (err => {
            res.status (500).send ({
                message:
                    err.message || 'Some error occurred while retrieving sales.',
            });
        });
}

// Find a single Sale with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Sale.findById (id)
        .then (data => {
            if (!data)
                res.status (404).send ({message: 'Not found Sale with id ' + id});
            else res.send (data);
        })
        .catch (err => {
            res
                .status (500)
                .send ({message: 'Error retrieving Sale with id=' + id});
        });
}

// Update a Sale by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status (400).send ({
            message: 'Data to update can not be empty!',
        });
    }

    const id = req.params.id;

    Sale.findByIdAndUpdate (id, req.body, {useFindAndModify: false})
        .then (data => {
            if (!data) {
                res.status (404).send ({
                    message: `Cannot update Sale with id=${id}. Maybe Sale was not found!`,
                });
            } else res.send ({message: 'Sale was updated successfully.'});
        }
        )
        .catch (err => {
            res.status (500).send ({
                message: 'Error updating Sale with id=' + id,
            });
        }
        );
}

// Delete a Sale with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Sale.findByIdAndRemove (id)
        .then (data => {
            if (!data) {
                res.status (404).send ({
                    message: `Cannot delete Sale with id=${id}. Maybe Sale was not found!`,
                });
            } else {
                res.send ({
                    message: 'Sale was deleted successfully!',
                });
            }
        })
        .catch (err => {
            res.status (500).send ({
                message: 'Could not delete Sale with id=' + id,
            });
        });
}
