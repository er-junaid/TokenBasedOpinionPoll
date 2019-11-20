const mongoose = require('mongoose');
const config = require('config');

const db = config.get('localMongoURI');

const connectDB = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then((response) => console.log('MongoDB Connected...'))
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
};

module.exports = connectDB;