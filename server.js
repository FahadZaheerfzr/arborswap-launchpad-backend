const express = require('express');
const cors = require('cors');
const db = require('./app/models');

const app = express();


db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch(err => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    }
    );
app.use(cors());

app.options('*', cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

// simple route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the server.'
    });
}
);

require('./app/routes/banner.routes')(app);
require('./app/routes/sale.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
}
);