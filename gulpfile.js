var gulp = require ('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    karma = require('karma').server,
    nodemon = require('gulp-nodemon');

var bowerSources = [
  'bower_components/**/*.js'
];

var jsSources = [
  'components/scripts/*.js'
];

var appSources = [
  'components/scripts/app/controllers/*.js',
  'components/scripts/app/directives/*.js',
  'components/scripts/app/routing/*.js',
  'components/scripts/app/services/*.js'
];

var jslibSources = [
  'components/scripts/lib/*.js',
  'components/scripts/lib/**/*.js'
];

var csslibSources = [
  'components/css/lib/*.css'
];

var jsonSources = [
  'components/scripts/json/*.json'
];

var sassSources = [
  'components/sass/*.scss'
];

var cssSources = [
  'components/css/*.css'
];

var coffeeSources = [
  'components/coffee/*.coffee'
];

var viewSources = [
  'views/**/*.ejs'
];

gulp.task('lib', function(){
// Javascript libs livereload
  gulp.src(jslibSources)
  .pipe(gulp.dest('public/lib'))
  .pipe(livereload());
// CSS libs livereload
  gulp.src(csslibSources)
  .pipe(minifycss())
  .pipe(gulp.dest('public/lib'))
  .pipe(livereload());
});

gulp.task('app', function(){
// App livereload
  gulp.src(appSources)
  .pipe(concat('app.js'))
  .pipe(gulp.dest('public/javascripts'))
  .pipe(livereload());
});

gulp.task('js', function() {
// Javascript hint, uglify, concat, and livereload
  gulp.src(jsSources)
  .pipe(jshint())
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('public/javascripts'))
  .pipe(livereload());
});

gulp.task('json', function(){
// JSON livereload
  gulp.src(jsonSources)
  .pipe(gulp.dest('public/javascripts/json'))
  .pipe(livereload());
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
  .pipe(coffee({bare: true}))
    .on('error', gutil.log)
  .pipe(gulp.dest('components/scripts'));
});

gulp.task('css', function(){
  gulp.src(cssSources)
  .pipe(concat('main.css'))
  .pipe(gulp.dest('public/stylesheets'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('public/stylesheets'))
  .pipe(livereload());
});

gulp.task('sass', function(){
  // CSS autoprefixer, minify, and livereload
  gulp.src(sassSources)
  .pipe(sass({style: 'expanded', lineNumbers: true,includePaths: ['bower_components/foundation/scss']}))
    .on('error', gutil.log)
  .pipe(concat('sass.css'))
  .pipe(gulp.dest('public/stylesheets'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('public/stylesheets'))
  .pipe(livereload());
});


gulp.task('bower', function(){
  gulp.src(bowerSources)
  .pipe(gulp.dest('components/scripts/lib'));
});


gulp.task('launch', function () {
  nodemon({ script: './bin/www', ext: 'html js', ignore: ['components', 'public', 'design'] })
    .on('restart', function () {
      console.log('restarted!')
    })
});

gulp.task('build', function(){
  gulp.src(cssSources)
  .pipe(concat('main.css'))
  .pipe(gulp.dest('public/stylesheets'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('public/stylesheets'))
  gulp.task('bower');
  gulp.src(jslibSources)
  .pipe(gulp.dest('public/lib'))
  gulp.src(csslibSources)
  .pipe(minifycss())
  .pipe(gulp.dest('public/lib'))

  gulp.src(appSources)
  .pipe(concat('app.js'))
  .pipe(gulp.dest('public/javascripts'))

  gulp.src(coffeeSources)
  .pipe(coffee({bare: true}))
    .on('error', gutil.log)
  .pipe(gulp.dest('components/scripts'));

  gulp.src(jsSources)
  .pipe(jshint())
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('public/javascripts'))

  gulp.src(sassSources)
  .pipe(sass({style: 'expanded', lineNumbers: true}))
    .on('error', gutil.log)
  .pipe(concat('sass.css'))
  .pipe(gulp.dest('public/stylesheets'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('public/stylesheets'))

  gulp.src(cssSources)
  .pipe(concat('main.css'))
  .pipe(gulp.dest('public/stylesheets'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('public/stylesheets'))
});

gulp.task('views', function(){
 gulp.src(viewSources)
 .pipe(livereload());
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch(jsSources, ['js']);
  gulp.watch(jsonSources, ['json']);
  gulp.watch(appSources, ['app']);
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(cssSources, ['css']);
  gulp.watch(viewSources, ['views']);
});


gulp.task('default', ['js', 'app', 'coffee', 'sass', 'css', 'launch', 'watch']);
gulp.task('lint', function () {
  gulp.src(jsSources)
    .pipe(jshint())
});
