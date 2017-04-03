'use strict';

var gulp		= require('gulp');
var less		= require('gulp-less');
var copy		= require('gulp-copy');
var path		= require('path');
var tinypng		= require('gulp-tinypng');
var concat		= require('gulp-concat');
var prune		= require('gulp-prune');
var minify		= require('gulp-minifier');
var clean 		= require('gulp-clean');

gulp.task('clean', function() {
	return 	gulp.src('./build', {read: false})
			.pipe(clean());
});

gulp.task('sync', ['clean'], function () {
	return 	gulp.src(['./source/**', '!./source/plugins/**', '!./source/stylesheets/**', '!./source/scripts/**'], {dot: true})
			.pipe(gulp.dest('./build'));
});

gulp.task('less', ['sync'], function () {
	return 	gulp.src('./source/stylesheets/master.less')
			.pipe(less())
			.pipe(gulp.dest('./build/stylesheets'));
});

gulp.task('fonts', ['sync'], function () {
	return 	gulp.src('./source/fonts/*')
	  		.pipe(copy('./build/fonts', {prefix: 2}));
});

gulp.task('images', function () {
	return 	gulp.src(['./source/images/*.jpg', './source/images/*.png'])
	        .pipe(tinypng('w2lWbNviXvf2vp4OhLKNUOsexrAd0x-R'))
	        .pipe(gulp.dest('./build/images'));
});

gulp.task('plugins', ['sync'], function () {
	return 	gulp.src([
				'./source/plugins/jquery/dist/jquery.min.js'
			])
	        .pipe(concat('plugins.js'))
	        .pipe(gulp.dest('./build/scripts'));
});

gulp.task('scripts', ['sync'], function () {
	return 	gulp.src([
				'./source/scripts/functions.js'
			])
	        .pipe(concat('functions.js'))
	        .pipe(gulp.dest('./build/scripts'));
});

gulp.task('stylesheets', ['less'], function () {
	return 	gulp.src([
				'./source/plugins/nucleus-framework/build/nucleus.min.css',
				'./build/stylesheets/master.css'
			])
	        .pipe(concat('master.css'))
	        .pipe(gulp.dest('./build/stylesheets'));
});

gulp.task('minify-js', function () {
	return	gulp.src('./build/scripts/*')
			.pipe(minify({
				minify: true,
				collapseWhitespace: true,
				conservativeCollapse: true,
				minifyJS: true,
				minifyCSS: true,
			}))
			.pipe(gulp.dest('./build/scripts'));
});

gulp.task('minify-css', function () {
	return	gulp.src('./build/stylesheets/master.css')
			.pipe(minify({
				minify: true,
				collapseWhitespace: true,
				conservativeCollapse: true,
				minifyJS: true,
				minifyCSS: true,
			}))
			.pipe(gulp.dest('./build/stylesheets'));
});

gulp.task('watcher', ['default'], function () {
	gulp.watch(['./source/stylesheets/master.less', './source/**/*.php'], ['default']);
});

gulp.task('default', ['less', 'plugins', 'scripts', 'stylesheets', 'sync', 'fonts']);
gulp.task('watch', ['default', 'watcher']);
gulp.task('minify', ['minify-css', 'minify-js']);
gulp.task('optimize_images', ['images']);
