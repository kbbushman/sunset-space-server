// Use dotenv to read .env vars into Node
require('dotenv').config();
const configureStripe = require('stripe');

// const secretKey = process.env.MY_SECRET_KEY

const STRIPE_SECRET_KEY = 'sk_test_21sbK2K869BnJJPOm3BGpKcd';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
