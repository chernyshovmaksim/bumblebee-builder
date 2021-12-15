const { series, parallel, src, dest, watch } = require("gulp");

const bs = require("browser-sync").create();
const del = require("del");
const csso = require("gulp-csso");
const sass = require("gulp-sass")(require("sass"));
const webp = require("gulp-webp");
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const webpack = require("webpack-stream");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");

const clean = () => {
	return del(["./public"], { force: true });
};

const server = () => {
	return bs.init({
		server: {
			baseDir: "./public",
		},
	});
};

const html = () => {
	return src("./app/*.html")
	.pipe(dest("./public"))
	.pipe(bs.stream());
};

const style = () => {
	return src("./app/sass/**/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(sourcemaps.write())
		.pipe(dest("./public/css/"))
		.pipe(bs.stream());
};

const scripts = () => {
	return src(["./app/js/app.js"])
		.pipe(
			webpack({
				mode: "development",
				module: {
					rules: [
						{
							test: /\.m?js$/,
							exclude: /(node_modules|bower_components)/,
							use: {
								loader: "babel-loader",
								options: {
									presets: ["@babel/preset-env"],
								},
							},
						},
					],
				},
			})
		)
		.pipe(rename("app.min.js"))
		.pipe(dest("./public/js"))
		.pipe(bs.stream());
};

const images = () => {
	return src("./app/img/**/*")
	.pipe(webp())
	.pipe(dest("./public/img"))
	.pipe(bs.stream());
};


const watching = (cb) => {
	watch("./app/sass/**/*.scss", series(style));
	watch("./app/js/**/*.js", series(scripts));
	watch("./app/*.{html,htm}", series(html));
	watch("./app/img/**/*", series(images));
	cb();
};

exports.default = series(
	images,
	html, 
	style, 
	scripts, 
	parallel(watching, server)
);

exports.clean = clean;
exports.html = html;
exports.server = server;
exports.images = images;
exports.scripts = scripts;
exports.style = style;
