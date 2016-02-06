var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var karma = require('gulp-karma');
var jasmine = require('gulp-jasmine');
var istanbul = require('gulp-istanbul');
var Server = require('karma').Server;

// Lint (JSHint) Task -
// JSHint is a tool that helps to detect errors and potential problems in your JavaScript code
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

// Compile Less (CSS)
gulp.task('less', function () {
    return gulp.src(['./public/stylesheets/less/*.less',
        './public/stylesheets/less/**/*.less'])
            .pipe(less())
            .pipe(gulp.dest('./public/stylesheets/dist'));
});

// Convert all (html) Angular templates into templates.js cache file
gulp.task('templates', function () {
    return gulp.src('./public/templates/*.html')
            .pipe(templateCache('templates.js', {module: 'meanstacktutorials'}))
            .pipe(gulp.dest('./public/javascript/dist'));
});

// Concatenate (combine) js then run the templates task
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
gulp.task('karma', ['templates'], function () {
    return gulp.src(["public/javascript/**/*.js"])
            .pipe(karma({
                configFile: __dirname + '/karma.conf.js',
                action: 'run'
            }))
            .pipe(istanbul({includeUntested: true})) // Covering files            
            .pipe(istanbul.hookRequire()) // Force 'require' to return covered files
                        .pipe(jasmine())
                        .pipe(istanbul.writeReports())
                        .pipe(istanbul.enforceThresholds({thresholds: {global: 90}})) // code coverage of 90%
    
            .on('error', function (err) {
                throw err;
            });
});

// Jasmine
gulp.task('jasmine', ['templates'], function () {
    gulp.src([
        './controllers/**/*.js',
        './models/**/*.js',
        './routes/**/*.js',
        './services/**/*.js',
        './utils/**/*.js',
        './app.js'
    ])
            .pipe(istanbul({includeUntested: true})) // Covering files
            .pipe(istanbul.hookRequire()) // Force 'require' to return covered files
            .on('finish', function () {
                gulp.src(['./tests/backend/**/*Spec.js'])
                        .pipe(jasmine())
                        .pipe(istanbul.writeReports())
                        .pipe(istanbul.enforceThresholds({thresholds: {global: 90}})) // code coverage of 90%
                        .on('end');
            });
});


// watch files for changes and recompile if any are detected
gulp.task('watch', function () {
    // css
    gulp.watch('./public/stylesheets/less/**/*.less', ['less']);

    // Note: ./routes/*.js is not recompiled as this is loaded in app.js
    var watchList = [
        './public/javascript/**/*.js',
        './public/templates/**/*.html',
        './views/*.ejs',
        './utils/*.js'
    ];

    // Concate (combine) js and html
    for (var i = 0; i < watchList.length; i++) {
        gulp.watch(watchList[i], ['concat'], ['lint']);
    }
});

// Used for development 'gulp dev'
gulp.task('dev', ['less', 'concat']);

// Runs unit tests
gulp.task('test', ['karma', 'jasmine']);

// Used for production 'gulp'
gulp.task('default', ['lint', 'less', 'minify']);
