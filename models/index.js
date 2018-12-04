const mongoose = require('mongoose');
const port = 27017;
const localUrl = `mongodb://localhost:${port}/sunset`;

mongoose.connect(process.env.MONGODB_URI || localUrl, { useNewUrlParser: true })
.then(() => console.log(`MongoDB connection working at port ${port}...`))
.catch(err => console.log(err));

module.exports = {
    Plan: require('./plan'),
    Tour: require('./tour'),
    User: require('./user'),
    Avatar: require('./avatar'),
}