// Use dotenv to read .env vars into Node
require('dotenv').config();
const configureStripe = require('stripe');

const secretKey = process.env.MY_SECRET_KEY

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
? 'sk_live_MY_SECRET_KEY'
: secretKey;

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
