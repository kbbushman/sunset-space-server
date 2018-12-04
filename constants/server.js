const path = require('path');

const SERVER_PORT = 4000;

const SERVER_CONFIGS = {
    PRODUCTION: process.env.NODE_ENV === 'production',
    PORT: process.env.PORT || SERVER_PORT,
};

module.exports = SERVER_CONFIGS;