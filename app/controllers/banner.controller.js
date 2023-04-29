const db = require('../models');
const Banner = db.banner;
// Create and Save a new Banner
exports.create = (req, res) => {
    console.log("req.body", req.body);

    // Validate request
    if (!req.body.url) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    // Create a Banner
    const banner = new Banner({
        url: req.body.url,
        name: req.body.name,
    });


    // Save Banner in the database
    banner
        .save(banner)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || 'Some error occurred while creating the Banner.'
                });
        });
}

// Retrieve all Banners from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: 'i' } } : {};

    Banner.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || 'Some error occurred while retrieving banners.'
                });
        });
}

// Find a single Banner with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Banner.findById(id)
        .then(data => {
            if (!data)
                res.status(404)
                    .send({ message: 'Not found Banner with id ' + id });
            else res.send(data);
        }
        )
        .catch(err => {
            res.status(500)
                .send({ message: 'Error retrieving Banner with id=' + id });
        }
        );

}

// Update a Banner by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400)
            .send({ message: 'Data to update can not be empty!' });
    }

    const id = req.params.id;

    Banner.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404)
                    .send({
                        message: `Cannot update Banner with id=${id}. Maybe Banner was not found!`
                    });
            } else res.send({ message: 'Banner was updated successfully.' });
        }
        )
        .catch(err => {
            res.status(500)
                .send({
                    message: 'Error updating Banner with id=' + id
                });
        }
        );
}

// Delete a Banner with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Banner.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404)
                    .send({
                        message: `Cannot delete Banner with id=${id}. Maybe Banner was not found!`
                    });
            } else {
                res.send({
                    message: 'Banner was deleted successfully!'
                });
            }
        }
        )
        .catch(err => {
            res.status(500)
                .send({
                    message: 'Could not delete Banner with id=' + id
                });
        }
        );
}

// Delete all Banners from the database.
exports.deleteAll = (req, res) => {
    Banner.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Banners were deleted successfully!`
            });
        }
        )
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || 'Some error occurred while removing all banners.'
                });
        }
        );
}


