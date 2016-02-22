module.exports = {
  database: {
    uri: 'mongodb://localhost/meanstacktutorials',
    options: {
      server: {
        socketOptions: {
          poolSize: 5,
          keepAlive: 1
        }
      }
    }
  }
};
