var gulp         = require('gulp');
var gutil        = require('gulp-util');
var plumber      = require('gulp-plumber');

var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');

var imagemin     = require('gulp-imagemin');

var sass         = require('gulp-sass');
var cleancss     = require('gulp-clean-css');
var autoprefix   = require('gulp-autoprefixer');

var browserSync  = require('browser-sync').create();
var childProcess = require('child_process');

var platform  = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

gulp.task('images', function () {
  return gulp.src('_images/*.*')
    .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('assets/images'));
});

gulp.task('scripts', function () {
  return gulp.src('_scripts/*.js')
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/scripts'));
});

gulp.task('sass', function () {
  return gulp.src('_sass/main.scss')
    .pipe(plumber())
    .pipe(sass())
    // .pipe(cleancss())
    .pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('jekyll', function () {
  var jekyll = childProcess.spawn( platform , ['build', '--watch']);

  var jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', ['jekyll', 'sass', 'scripts', 'images'], () => {
    browserSync.init({
        files: ['_site/**'],
        reloadDelay: 2000,
        port: 4000,
        server: {
            baseDir: '_site'
        }
    });

    gulp.watch(['_sass/*.*'], ['sass']);
    gulp.watch(['_scripts/*.*'], ['scripts']);
});

gulp.task('default', ['serve']);
