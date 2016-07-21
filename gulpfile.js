'use strict';
let gulp = require ('gulp');
let gutil = require ('gulp-util');
let cssmin = require ('gulp-cssmin');
let sass = require ('gulp-sass');
let buffer = require ('vinyl-buffer');
let source = require ('vinyl-source-stream');
let babelify = require ('babelify');
let browserify = require ('browserify');
let watchify = require ('watchify');
let uglify = require ('gulp-uglify');
let gzip = require ('gulp-gzip');
let sourcemaps = require ('gulp-sourcemaps');

let dependencies = [
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
  'redux-thunk',
  'whatwg-fetch'
];
let stageDir = '../pollster-stage';
let base = 'dist';

gulp.task ('default', ['html', 'images', 'server', 'styles', 'vendor',
 'browserify-watch', 'watch']);
gulp.task ('stage', ['set-stage', 'html', 'images', 'server', 'styles',
'vendor-stage', 'browserify-stage']);

// set the destination for staging output and copy stage root files
gulp.task ('set-stage', function () {
  base = stageDir + '/dist';
  return gulp.src (['stage/*', 'stage/.*'])
    .pipe (gulp.dest (stageDir));
});

// set watch tasks for continous build
gulp.task ('watch', function () {
  gulp.watch ('src/client/index.html', ['html']);
  gulp.watch ('src/client/images/*', ['images']);
  gulp.watch ('src/server/*.js', ['server']);
  gulp.watch ('src/client/css/**/*.scss', ['styles']);
  gulp.watch (dependencies, ['vendor']);
});

// copy index.html and favicon.ico
gulp.task ('html', function () {
  return gulp.src (['src/client/index.html', 'src/client/favicon.ico'])
    .pipe (gulp.dest (base + '/public'));
});

// copy images
gulp.task ('images', function () {
  return gulp.src ('src/client/images/*.*')
    .pipe (gulp.dest (base + '/public/images'));
});

// copy server
gulp.task ('server', function () {
  return gulp.src ('src/server/*.js')
    .pipe (gulp.dest (base));
});

// compile third-party dependencies
gulp.task ('vendor', function () {
  return browserify ()
    .require (dependencies)
    .bundle ()
    .pipe (source ('vendor.bundle.js'))
    .pipe (buffer ())
    .pipe (uglify ({ mangle: false }))
    .pipe (gzip ({ append: true }))
    .pipe (gulp.dest (base + '/public/js'));
});

// compile stylesheets
gulp.task ('styles', function () {
  return gulp.src ('src/client/css/main.scss')
    .pipe (sass ().on ('error', sass.logError))
    .pipe (cssmin ())
    .pipe (gulp.dest (base + '/public/css'));
});

// compile and package application
gulp.task ('browserify-watch', function () {
  let bundler = watchify (browserify ({ entries: 'src/client/main/components/App.jsx', debug: true }, watchify.args));
  bundler.external (dependencies);
  bundler.transform (babelify, { presets: ['es2015', 'react'] });
  bundler.on ('update', rebundle);
  return rebundle ();

  function rebundle () {
    let start = Date.now ();
    return bundler.bundle ()
      .on ('error', function (err) {
        gutil.log (gutil.colors.red (err.toString ()));
      })
      .on ('end', function () {
        gutil.log (gutil.colors.green ('Finished rebundling in', (Date.now () - start) + 'ms.'));
      })
      .pipe (source ('bundle.js'))
      .pipe (buffer ())
      .pipe (gzip ({ append: true }))
      .pipe (sourcemaps.init ({ loadMaps: true }))
      .pipe (sourcemaps.write ('.'))
      .pipe (gulp.dest (base + '/public/js/'));
  }
});

// tasks to prepare staging version of application
gulp.task ('vendor-stage', function () {
  process.env.NODE_ENV = 'production';
  return browserify ()
    .require (dependencies)
    .bundle ()
    .pipe (source ('vendor.bundle.js'))
    .pipe (buffer ())
    .pipe (uglify ({ mangle: false }))
    .pipe (gzip ({ append: true }))
    .pipe (gulp.dest (base + '/public/js'));
});

gulp.task ('browserify-stage', function () {
  process.env.NODE_ENV = 'production';
  let bundler = browserify ({ entries: 'src/client/main/components/App.jsx', debug: true });
  bundler.external (dependencies);
  bundler.transform (babelify, { presets: ['es2015', 'react'] });
  bundler.on ('update', rebundle);
  return rebundle ();

  function rebundle () {
    let start = Date.now ();
    return bundler.bundle ()
      .on ('error', function (err) {
        gutil.log (gutil.colors.red (err.toString ()));
      })
      .on ('end', function () {
        gutil.log (gutil.colors.green ('Finished rebundling in', (Date.now () - start) + 'ms.'));
      })
      .pipe (source ('bundle.js'))
      .pipe (buffer ())
      .pipe (uglify ({ mangle: false }))
      .pipe (gzip ({ append: true }))
      .pipe (gulp.dest (base + '/public/js/'));
  }
});
