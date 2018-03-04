/* eslint-env node */
/* eslint prefer-arrow-callback: off */
/* eslint func-names: off */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const gulp = require ('gulp');
const gutil = require ('gulp-util');
const buffer = require ('vinyl-buffer');
const source = require ('vinyl-source-stream');
const babelify = require ('babelify');
const browserify = require ('browserify');
const watchify = require ('watchify');
const minify = require ('gulp-babel-minify');
const gzip = require ('gulp-gzip');
const sourcemaps = require ('gulp-sourcemaps');

const dependencies = [
  'prop-types',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-dom',
  'redux',
  'redux-thunk',
  'styled-components',
  'whatwg-fetch',
];
const stageDir = '../pollster-stage';
let base = 'dist';

gulp.task ('default', ['html', 'images', 'server', 'vendor-dev',
  'browserify-dev', 'watch']);
gulp.task ('stage', ['set-stage', 'html', 'images', 'server',
  'vendor-stage', 'browserify-stage']);

// set the destination for staging output and copy stage root files
gulp.task ('set-stage', function () {
  base = `${stageDir}/dist`;
  return gulp.src (['stage/*', 'stage/.*'])
    .pipe (gulp.dest (stageDir));
});

// set watch tasks for continous build
gulp.task ('watch', function () {
  gulp.watch ('src/client/index.html', ['html']);
  gulp.watch ('src/client/images/*', ['images']);
  gulp.watch ('src/server/**/*.js*', ['server']);
  gulp.watch (dependencies, ['vendor']);
});

// copy index.html and favicon.ico
gulp.task ('html', function () {
  return gulp.src (['src/client/index.html', 'src/client/favicon.ico'])
    .pipe (gulp.dest (`${base}/public`));
});

// copy images
gulp.task ('images', function () {
  return gulp.src ('src/client/images/*.*')
    .pipe (gulp.dest (`${base}/public/images`));
});

// copy server
gulp.task ('server', function () {
  return gulp.src ('src/server/**/*.js*')
    .pipe (gulp.dest (base));
});

// compile third-party dependencies
gulp.task ('vendor-dev', function () {
  return browserify ()
    .require (dependencies)
    .bundle ()
    .pipe (source ('vendor.bundle.js'))
    .pipe (buffer ())
    .pipe (sourcemaps.init ({ loadMaps: true }))
    .pipe (sourcemaps.write ('.'))
    .pipe (gulp.dest (`${base}/public/js`));
});

// compile and package application
gulp.task ('browserify-dev', function () {
  const config = { entries: 'src/client/components/App/index.js', debug: true };
  const bundler = watchify (browserify (config, watchify.args));
  bundler.external (dependencies);
  bundler.transform (babelify, { presets: [
    ['env', {
      targets: {
        browsers: [
          'chrome >= 61',
          'firefox >= 55',
          'opera >= 49',
          'ios >= 10.3',
          'safari >= 10.1',
          'edge >= 15',
        ],
      },
    }],
    'react',
  ] });
  bundler.on ('update', rebundle);
  return rebundle ();

  function rebundle () {
    const start = Date.now ();
    return bundler.bundle ()
      .on ('error', function (err) {
        gutil.log (gutil.colors.red (err.toString ()));
      })
      .on ('end', function () {
        gutil.log (gutil.colors.green ('Finished rebundling in', Date.now () - start, 'ms.'));
      })
      .pipe (source ('bundle.js'))
      .pipe (buffer ())
      .pipe (sourcemaps.init ({ loadMaps: true }))
      .pipe (sourcemaps.write ('.'))
      .pipe (gulp.dest (`${base}/public/js/`));
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
    .pipe (minify ({ mangle: false }))
    .pipe (gulp.dest (`${base}/public/js`))
    .pipe (gzip ({ append: true }))
    .pipe (gulp.dest (`${base}/public/js`));
});

gulp.task ('browserify-stage', function () {
  process.env.NODE_ENV = 'production';
  const bundler = browserify ({ entries: 'src/client/components/App/index.js', debug: false });
  bundler.external (dependencies);
  bundler.transform (babelify, { presets: [
    ['env', {
      targets: {
        browsers: [
          'chrome >= 61',
          'firefox >= 55',
          'opera >= 49',
          'ios >= 10.3',
          'safari >= 10.1',
          'edge >= 15',
        ],
      },
    }],
    'react',
  ] });
  bundler.on ('update', rebundle);
  return rebundle ();

  function rebundle () {
    const start = Date.now ();
    return bundler.bundle ()
      .on ('error', function (err) {
        gutil.log (gutil.colors.red (err.toString ()));
      })
      .on ('end', function () {
        gutil.log (gutil.colors.green ('Finished rebundling in', Date.now () - start, 'ms.'));
      })
      .pipe (source ('bundle.js'))
      .pipe (buffer ())
      .pipe (minify ({ mangle: false }))
      .pipe (gulp.dest (`${base}/public/js`))
      .pipe (gzip ({ append: true }))
      .pipe (gulp.dest (`${base}/public/js`));
  }
});
