// db.js
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(`${config.db.url}/${config.db.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;