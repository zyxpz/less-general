const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const less = require('gulp-less');
const stripCssComments = require('gulp-strip-css-comments');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({
	browsers: ['last 2 versions']
});

const paths = {
	css: 'lib',
	dist: 'dist',
	distCss: 'dist/'
};

const distFiles = {
	css: [
		paths.css + '/*.css',
		paths.css + '/*.less'
	]
};

const files = {
	css: [
		paths.css + "/*.css",
		paths.css + "/*.less",
		paths.css + "/**/*.css",
		paths.css + "/**/*.less"
	]
};

// 清理dist
gulp.task('clean', () => {
	return gulp.src(paths.dist)
		.pipe(plugins.clean({
			force: true
		}));
});

// css, less
gulp.task('styles', () => {
	return gulp.src(distFiles.css)
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(stripCssComments())
		.pipe(plugins.minifyCss({
			advanced: false
		}))
		.pipe(gulp.dest(paths.distCss));
})

gulp.task("watch:css", () => {
	// 监听css变化
	gulp.watch(files.css, () => {
		gulp.run('styles');
	});
});

gulp.task('default', () => {
	gulp.run('styles');
	gulp.run('watch:css');
});

gulp.task('build', ['clean'], () => {
	gulp.run('default');
});
