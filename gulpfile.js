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

// Lint (JSHint) Task
gulp.task('lint', function () {
    return gulp.src([
        './controllers/**/*.js',
        './models/**/*.js',
        './routes/**/*.js',
        './services/**/*.js',
        './utils/**/*.js',
        './app.js',
        './public/javascript/**/*.js'
    ]).pipe(jshint()).pipe(jshint.reporter('default'));
});

// Compile Less
gulp.task('less', function () {
    return gulp.src(['./public/stylesheets/less/*.less',
        './public/stylesheets/less/**/*.less'])
            .pipe(less())
            .pipe(gulp.dest('./public/stylesheets/dist'));
});

// Convert Angular templates into a cache file
gulp.task('templates', function () {
    return gulp.src('./public/templates/*.html')
            .pipe(templateCache('templates.js', {module: 'meanstacktutorials'}))
            .pipe(gulp.dest('./public/javascript/dist'));
});

// Concatenate JavaScripts
gulp.task('concat', ['templates'], function () {
    return gulp.src([
        './app.js',
        './dist/templates.js',
        './constants/**/*.js',
        './controllers/**/*.js',
        './directives/**/*.js',
        './filters/**/*.js',
        './models/**/*.js',
        './services/**/*.js'
    ], {
        cwd: './public/javascript'
    })
            .pipe(concat('all.js'))
            .pipe(gulp.dest('./public/javascript/dist'));
});

// Minify JavaScripts
gulp.task('minify', ['concat'], function () {
    return gulp.src('./dist/all.js', {cwd: './public/javascript'})
            .pipe(rename('all.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./public/javascript/dist'));
});

// Karma
gulp.task('karma', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

// Code coverage
gulp.task('istanbul', ['templates'], function (cb) {
    // All source files that should be included in the code coverage report
    return gulp.src([
        './controllers/**/*.js',
        './models/**/*.js',
        './routes/**/*.js',
        './services/**/*.js',
        './utils/**/*.js',
        './app.js'
    ])
            .pipe(istanbul({includeUntested: true})) // Covering files
            .pipe(istanbul.hookRequire()) // Force 'require' to return covered filed
            .on('finish', function () {
                // Source to test
                gulp.src(['./tests/frontend/**/*Spec.js'])
                        .pipe(jasmine())
                        .pipe(istanbul.writeReports())
                        .pipe(istanbul.enforceThresholds({thresholds: {global: 90}})) // code coverage of 90%
                        .on('end', cb);
            });
});

// Run Node.js tests and create LCOV-format reports with Istanbul
gulp.task('test-server', function () {
    return gulp.src([
        './controllers/**/*.js',
        './models/**/*.js',
        './routes/**/*.js',
        './services/**/*.js',
        './utils/**/*.js',
        './app.js'
    ])

            .pipe(karma({
                configFile: __dirname + '/karma.conf.js',
                action: 'run'
            }))

            .pipe(istanbul({includeUntested: true})) // Covering files
            .pipe(istanbul.hookRequire()) // Force 'require' to return covered files

            .pipe(istanbul()) // Node.js source coverage
            .on('end', function () {
                gulp.src(['./tests/frontend/**/*Spec.js'])
                        .pipe(jasmine())
                        .on('error', function (err) {
                            throw err;
                        })
                        .pipe(istanbul.writeReports('reports')); // Creating reports
            });
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('./public/javascript/**/*.js', ['concat']);
    gulp.watch('./public/templates/**/*.html', ['concat']);
    gulp.watch('./public/stylesheets/less/**/*.less', ['less']);
});

// Used for development 'gulp dev'
gulp.task('dev', ['less', 'concat']);

// Runs unit tests
gulp.task('test', ['karma', 'istanbul']);

// Used for production 'gulp'
gulp.task('default', ['lint', 'less', 'minify']);