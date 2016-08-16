'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    jasmine = require('gulp-jasmine'),
    tslint = require('gulp-tslint'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat');

gulp.task('pug', function(){
  gulp.src('src/html-jade/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('builds/development/'))
})
gulp.task('ts', function(){
  gulp.src('src/js-typescript/*.ts')
    .pipe(plumber())
    .pipe(tslint({
      formatter: 'verbose',
      configuration: 'tslint.json'
    }))
    .pipe(tslint.report({
        emitError: true
    }))
    .pipe(sourcemaps.init())
    .pipe(typescript({
        target: "ES5",
        sortOutput: true,
        noImplicitAny: true,
        out: 'main.js'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('builds/development/js'))
});

gulp.task('build-specs', function(){
  gulp.src('src/specs-jasmine/*.ts')
    .pipe(plumber())
    .pipe(tslint({
      formatter: 'verbose',
      configuration: 'tslint.json'
    }))
    .pipe(tslint.report({
        emitError: true
    }))
    .pipe(typescript({
        noImplicitAny: true,
        out: 'projectSpec.js'
    }))
    .pipe(gulp.dest('builds/development/specs'))
  });
gulp.task('jasmine', function(){
  return gulp.src('builds/development/specs/mainSpec.js')
    .pipe(jasmine())
});

gulp.task('concat-spec', function(){
  return gulp.src(['builds/development/js/main.js','builds/development/specs/projectSpec.js'])
    .pipe(concat({
      path: 'mainSpec.js'
    }))
    .pipe(gulp.dest('builds/development/specs/'))
})

gulp.task('watch', function(){
  gulp.watch('src/js-typescript/*.ts', ['ts']);
  gulp.watch('src/specs-jasmine/*.ts', ['build-specs', 'concat-spec', 'jasmine']);
  // gulp.watch('builds/development/specs/mainSpec.js', ['jasmine']);
});

gulp.task('default', ['watch'], function(){

});
