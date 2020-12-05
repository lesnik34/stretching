const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const htmlValidator = require('gulp-w3c-html-validator');

const scriptsSources = [
    'source/js/anime.min.js',
    'source/js/options.js',
    'source/js/util.js',
    'source/js/dialog.js',
    'source/js/main.js'
];

const svgSources = [
    'source/img/icons/sprite_*.svg'
];

// Clean

const clean = () => {
  return del ('build');
}

exports.clean = clean;

// Copy

const copy = () => {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/favicon*',
    'source/android*',
    'source/apple*',
    'source/site*'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

exports.copy = copy;

// Html

const html = () => {
  return gulp.src('source/*.html')
    .pipe(plumber())
    .pipe(htmlValidator({
       skipWarnings: true
    }))
    .pipe(htmlValidator.reporter())
    .pipe(gulp.dest('build'))
    .pipe(sync.stream());
}

exports.html = html;

// Styles

const styles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles = styles;

// Scripts

const scripts = () => {
  return gulp.src(scriptsSources)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(concat('script.js'))
    //.pipe(gulp.dest('build/js'))
    .pipe(rename('script.min.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/js'))
    .pipe(sync.stream())
}

exports.scripts = scripts;

// Images

const images = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 90, progressive: true}),
      imagemin.svgo()
    ]))
}

exports.images = images;

// WebP

const webP = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp())
    .pipe(gulp.dest('source/img'))
}

exports.webP = webP;

// Sprite

const sprite = () => {
  return gulp.src(svgSources)
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'))
}

exports.sprite = sprite;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    tunnel: true
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/**/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html));
  //gulp.watch('source/img/**/icon-*.svg', gulp.series(sprite));
}

// добавить image

const build = gulp.series(clean, copy, html, scripts, styles, sprite);

exports.build = build;

exports.default = gulp.series(
  build, server, watcher
);
