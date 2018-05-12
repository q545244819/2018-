const gulp = require('gulp')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const replace = require('gulp-replace')

gulp.task('server', () => {
	return gulp.src('server/**/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['es2015', 'react'] }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/server'))
})

gulp.task('react', () => {
	return gulp.src('src/**/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['es2015', 'react'] }))
		.pipe(sourcemaps.write('.'))
		.pipe(replace(/require\('.+.css'\);/gi, ''))
		.pipe(gulp.dest('dist/src'))
})

gulp.task('watch', () => {
	gulp.watch('server/**/*.js', ['server'])
	gulp.watch('src/**/*.js', ['react'])
})

gulp.task('default', ['watch'])
gulp.task('build', ['server', 'react'])
