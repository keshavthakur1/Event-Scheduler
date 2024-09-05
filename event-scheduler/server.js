const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/events');


require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;


connectDB();


app.use(bodyParser.json());


app.use('/events', eventRoutes);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${3000}`);
});
