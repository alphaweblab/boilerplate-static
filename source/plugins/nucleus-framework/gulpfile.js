'use strict';

var gulp		= require('gulp');
var less		= require('gulp-less');
var minify		= require('gulp-minifier');
var dest		= require('gulp-dest');

gulp.task('less', function () {
	return 	gulp.src('./source/nucleus.less')
			.pipe(less())
			.pipe(gulp.dest('./build'));
});

gulp.task('minify-css', function () {
	return	gulp.src('./build/nucleus.css')
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

gulp.task('default', ['less', 'minify-css']);
