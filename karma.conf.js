module.exports = function(config){
  config.set({
    port: 9000,
    basePath : './',
    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'public/javascript/**/*.js',      
      'app/components/**/*.js',
      'app/view*/**/*.js'
    ],
    colors: true,
    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['PhantomJS'],
    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
	    'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],
    junitReporter: {
      outputFile: 'coverage/unit.xml',
      suite: 'unit'
    }
  });
};
