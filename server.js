const express = require('express');
const cors = require('cors');
const db = require('./app/models');

const app = express();

var corsOptions = {
    origin: ['*', 'http://localhost:8081', 'http://localhost:8000', 'http://localhost:3000', 'https://arborswap-launchpad.vercel.app', 'http://54.242.172.198', 'http://54.173.22.152', 'http://localhost:3001', 'http://3.80.119.93', 'http://34.238.118.99'],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
};

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
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.use('/images', express.static('images'));


// simple route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the server.'
    });
}
);

require('./app/routes/banner.routes')(app);
require('./app/routes/sale.routes')(app);
require('./app/routes/airdrop.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
}
);
