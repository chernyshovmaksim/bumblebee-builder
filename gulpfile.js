const { series, parallel, src, dest, watch } = require('gulp');

const bs           = require('browser-sync').create();
const del          = require('del');
const csso         = require('gulp-csso');
const sass         = require('gulp-sass');
const webp         = require('gulp-webp');
const rename       = require('gulp-rename');
const webpack      = require('webpack-stream');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');


const clean = cb => {
	del([
		'app/css/main.css',
		'app/js/app.min.js'
	], { force: true });
	cb();
}

const server = cb => {
	bs.init({
		server: {
			baseDir: './app'
		}
	});
	cb();
}

const html = cb => {
	src('./app/*.html')
		.pipe(bs.stream());
	cb();
}

const style = cb => {
	src('./app/sass/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(dest('./app/css/'))
		.pipe(bs.stream());
	cb();
}

const MinifyStyle = cb => {
	src('./app/sass/main.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(csso())
		.pipe(rename('style.min.css'))
		.pipe(dest('./app/css/'))
	cb();
}

const scripts = cb => {
	src([
		'./app/js/app.js',
		'!./app/js/app.min.js'
	])
		.pipe(webpack(
			{
				mode: 'production',
				performance: { hints: false },
				module: {
					rules: [
						{
							test: /\.(js)$/,
							exclude: /(node_modules)/,
							loader: 'babel-loader',
							query: {
								presets: ['@babel/env'],
								plugins: ['babel-plugin-root-import']
							}
						}
					]
				}
			}
		))
		.pipe(rename('app.min.js'))
		.pipe(dest('./app/js'))
		.pipe(bs.stream());
	cb();
}

const images = cb => {
	src('./app/img/source/**/*')
		.pipe(webp())
		.pipe(dest('./app/img'));
	cb();
}

const watching = cb => {
	watch('./app/sass/**/*', series(style));
	watch(['./app/js/**/*.js', '!./app/js/app.min.js'], series(scripts));
	watch('./app/*.html', series(html));
	watch('./app/img/source/**/*', series(images));
	cb();
}

exports.default = series(clean, images, parallel(style, scripts, watching, server));
exports.build = series(clean, images, scripts, MinifyStyle);

exports.images = images;
exports.scripts = scripts;
exports.style = style;
exports.MinifyStyle = MinifyStyle;
