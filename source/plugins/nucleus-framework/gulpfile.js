'use strict';

var gulp		= require('gulp');
var sass		= require('gulp-sass');
var minify		= require('gulp-minifier');
var dest		= require('gulp-dest');

gulp.task('sync', function () {
	return 	gulp.src('./source/index.html')
			.pipe(gulp.dest('./build'));
});

gulp.task('sass', ['sync'], function () {
	return 	gulp.src(['./source/framework.scss', './source/utilities.scss', './source/docs.scss'])
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('./build'));
});

gulp.task('minify-css', ['sass'], function () {
	return	gulp.src(['./build/framework.css', './build/utilities.css'])
			.pipe(minify({
				minify: true,
				collapseWhitespace: true,
				conservativeCollapse: true,
				minifyJS: true,
				minifyCSS: true,
			}))
			.pipe(dest('/build', {ext: '.min.css'}))
			.pipe(gulp.dest('./'));
});

gulp.task('sass:watch', function () {
	gulp.watch(['./source/**/*.scss', './source/index.html'], ['sass']);
});

gulp.task('default', ['minify-css']);
gulp.task('watch', ['sass:watch']);
