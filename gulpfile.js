var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');
var istanbul = require('gulp-istanbul');
var Server = require('karma').Server;
var minifyCSS = require('gulp-minify-css');
var merge = require('merge-stream');

// Lint (JSHint) Task
gulp.task('lint', function () {
  return gulp.src([
    './server/controllers/**/*.js',
    './server/models/**/*.js',
    './server/routes/**/*.js',
    './server/services/**/*.js',
    './server/utils/**/*.js',
    './app.js',
    './client/javascript/**/*.js',
    // don't lint packaged or minified code
    // 9 out of 10 times this is optimized (e.g. no semicolons)
    '!./client/javascript/dist/*'
  ]).pipe(jshint()).pipe(jshint.reporter('default'));
});

// Compile Stylesheets
gulp.task('style', function () {
  var lessStream = gulp.src(['./client/stylesheets/less/*.less',
    './client/stylesheets/less/**/*.less'])
          .pipe(less())
          .pipe(concat('styles.less'));

  var cssStream = gulp.src(['./client/stylesheets/css/*.css',
    './client/stylesheets/css/**/*.css'])
          .pipe(concat('styles.css'));

  // Combine all style sheet files into one styles.css
  var mergedStream = merge(lessStream, cssStream)
          .pipe(concat('styles.css'))
          .pipe(gulp.dest('./client/stylesheets/dist'));

  return mergedStream;
});

// Convert Angular templates into a cache file
gulp.task('templates', function () {
  return gulp.src('./client/templates/*.html')
          .pipe(templateCache('templates.js', {
            module: 'meanstacktutorials'
          }))
          .pipe(gulp.dest('./client/javascript/dist'));
});

// Concatenate JavaScripts
gulp.task('concat', ['templates'], function () {
  return gulp.src([
    './client/javascript/app.js',
    './client/javascript/dist/templates.js',
    './client/javascript/constants/**/*.js',
    './client/javascript/controllers/**/*.js',
    './client/javascript/directives/**/*.js',
    './client/javascript/filters/**/*.js',
    './client/javascript/models/**/*.js',
    './client/javascript/services/**/*.js'
  ])
          .pipe(concat('all.js'))
          .pipe(gulp.dest('./client/javascript/dist'));
});

// Minify JavaScripts
gulp.task('minify', ['concat'], function () {
  return gulp.src('./dist/all.js', {cwd: './client/javascript'})
          .pipe(rename('all.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('./client/javascript/dist'));
});

// Karma
gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/testing/karma.conf.js',
    singleRun: true
  }, done).start();
});

// Unit tests with Jasmine and code coverage
gulp.task('coverage', ['templates'], function (cb) {
  // All source files that should be included in the code coverage report
  return gulp.src([
    './server/controllers/**/*.js',
    './server/models/**/*.js',
    './server/routes/**/*.js',
    './server/services/**/*.js',
    './server/utils/**/*.js',
    './client/javascript/**/*.js',
  ])
          .pipe(istanbul({includeUntested: true})) // Covering files
          .pipe(istanbul.hookRequire()) // Force 'require' to return covered filed
          .on('finish', function () {
            // Source to test
            gulp.src(['./tests/frontend/**/*Spec.js'])
                    // gulp-jasmine works on filepaths so you can't have any plugins before it 
                    .pipe(jasmine()) // run all unit tests in source
                    .pipe(istanbul.writeReports())
                    .pipe(istanbul.enforceThresholds({thresholds: {global: 90}})) // code coverage of 90%
                    .on('end', function () {
                      // On end have call back (function) pop off stack
                      console.log('Tests and code coverage complete. See reports.');
                      return;
                    });
          });
});

// Run Node.js tests and create LCOV-format reports with Istanbul
gulp.task('test-server', function () {
  return gulp.src([
    './server/controllers/**/*.js',
    './server/models/**/*.js',
    './server/routes/**/*.js',
    './server/services/**/*.js',
    './server/utils/**/*.js',
    './app.js'
  ])

          .pipe(karma({
            configFile: __dirname + '/testing/karma.conf.js',
            action: 'run'
          }))

          .pipe(istanbul({includeUntested: true})) // Covering files
          .pipe(istanbul.hookRequire()) // Force 'require' to return covered files

          .pipe(istanbul()) // Node.js source coverage
          .on('end', function () {
            gulp.src(['./testing/tests/frontend/**/*Spec.js'])
                    .pipe(jasmine())
                    .on('error', function (err) {
                      throw err;
                    })
                    .pipe(istanbul.writeReports('reports')); // Creating reports
          });
});

// Watch Files For Changes
gulp.task('watch', ['dev'], function () {
  // Let the html templates compile first that way there aren't any load conflicts with the JS
  gulp.watch('./client/templates/**/*.html', ['concat']);
  gulp.watch('./client/javascript/**/*.js', ['concat']);
  gulp.watch('./server/models/*.js', ['concat']);
  gulp.watch('./server/**/*.js', ['concat']);
  gulp.watch('./client/stylesheets/less/**/*.less', ['style']);
  gulp.watch('./client/stylesheets/less/*.less', ['style']);
  gulp.watch('./client/stylesheets/css/**/*.css', ['style']);
  gulp.watch('./client/stylesheets/css/*.css', ['style']);
});

// Used for development 'gulp dev'
gulp.task('dev', ['style', 'concat']);

// Runs unit tests
gulp.task('test', ['karma', 'coverage']);

// Used for production 'gulp'
gulp.task('default', ['lint', 'style', 'minify']);