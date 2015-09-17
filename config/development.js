module.exports = {
    database: {
	uri: 'mongodb://localhost/cleaningschedule',
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
