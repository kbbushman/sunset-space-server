const FRONTEND_DEV_URLS = [ 'http://localhost:3000' ];

const FRONTEND_PROD_URLS = [ 
    'https://ss-test-client.herokuapp.com',
    'https://ss-test-server.herokuapp.com/',
    'mongodb://heroku_pgglj6qc:tqinmqvr9lgresl73c3d1tk5kq@ds119210.mlab.com:19210/heroku_pgglj6qc'
 ];

 module.exports = FRONTEND_PROD_URLS;

//  module.exports = process.env.NODE_ENV === 'production'
//  ? FRONTEND_PROD_URLS
//  : FRONTEND_DEV_URLS;
