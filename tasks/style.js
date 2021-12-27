const { src, dest } = require("gulp");

//===================================================================
//===================================================================

const bs = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));

//===================================================================
//===================================================================

module.exports = function style() {
	return src("./app/sass/**/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(sourcemaps.write())
		.pipe(dest("./public/css/"))
		.pipe(bs.stream());
};
