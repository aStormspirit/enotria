const gulp = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;


gulp.task('clean', function () {
  return del("docs");
})

gulp.task('scss', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('docs/css'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', function () {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('docs/js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', function () {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css'
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('docs/scss'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "docs/"
    }
  });
});

gulp.task('html', function () {
  return gulp.src('app/*.html')
  .pipe(gulp.dest('docs/'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function () {
  return gulp.src('app/js/*.js')
    .pipe(gulp.dest('docs/js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('export', async function () {
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('docs'));

  let BuildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('docs/css'));

  let BuildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('docs/js'));

  let BuildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('docs/fonts'));

  let BuildImg = gulp.src('app/svg/**/*.*')
    .pipe(gulp.dest('docs/svg'));
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('app/*.html', gulp.series('html'))
  gulp.watch('app/js/*.js', gulp.series('script'))
});

gulp.task('build', gulp.series( 'clean',  gulp.parallel('export', 'css', 'scss', 'js',)));

gulp.task('default', gulp.series('build', gulp.parallel('browser-sync', 'watch')));
