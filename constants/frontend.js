const FRONTEND_DEV_URLS = [ 'http://localhost:3000' ];

const FRONTEND_PROD_URLS = [ 
    'https://sunset-space.herokuapp.com',
    'mongodb://heroku_6h37hbnb:5loar4glkqnrmsdraf7mqi49t7@ds113693.mlab.com:13693/heroku_6h37hbnb'
 ];

 module.exports = process.env.NODE_ENV === 'production'
 ? FRONTEND_PROD_URLS
 : FRONTEND_DEV_URLS;