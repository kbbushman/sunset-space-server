
const paymentAPI = require('./payment');

const configureRoutes = app => {
    paymentAPI(app);
};

module.exports = configureRoutes;