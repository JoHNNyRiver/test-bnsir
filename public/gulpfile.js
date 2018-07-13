var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var sass = require('gulp-sass')
var image = require('gulp-image')
var rename = require('gulp-rename')
var jsArray = [
    'js/*.js'
]

var imgArray = [
    'img/*'
]

gulp.task('css', ['cssdev'], function () {
  return gulp.src(['sass/*.sass', 'sass/**/*.sass'])
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest('dist/css'))
})
gulp.task('cssdev', function () {
  return gulp.src(['sass/*.sass', 'sass/**/*.sass'])
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
})
.task('jsdev', function(){
  return gulp.src(jsArray)
      .pipe(concat('all.js'))
      .pipe(gulp.dest('dist/js'))
})
.task('js', ['jsdev'], function(){
  return gulp.src(jsArray)
      .pipe(concat('all.min.js'))
      .pipe(uglify({
          preserveComments: false
      }))
      .pipe(gulp.dest('dist/js'))
})
.task('img', function () {
  gulp.src(imgArray)
  .pipe(image({
      pngquant: true,
      optipng: true,
      zopflipng: false,
      jpegRecompress: true,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true,
      concurrent: 7
  }))
  .pipe(gulp.dest('dist/img'))
})
.task('imgdev', function () {
  gulp.src(imgArray)
  .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: false,
      jpegRecompress: true,
      jpegoptim: false,
      mozjpeg: false,
      gifsicle: false,
      svgo: false,
      concurrent: 0
  }))
  .pipe(gulp.dest('dist/img'))
})
.task('watch', function () {
  gulp.watch('sass/**/*.sass', ['css'])
  gulp.watch(jsArray, ['jsdev'])
  //gulp.watch(imgArray, ['imgdev'])
})
.task('default', ['watch'])