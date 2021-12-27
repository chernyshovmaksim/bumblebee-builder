const { src, dest } = require("gulp");

//===================================================================
//===================================================================

const webp = require("gulp-webp");
const bs = require("browser-sync");

module.exports = function images(cb) {
	src(["./app/img/**/*", "!./app/img/**/*.svg"])
		.pipe(webp())
		.pipe(dest("./public/img"))
		.pipe(bs.stream());

	src(["./app/img/**/*.svg"]).pipe(dest("./public/img")).pipe(bs.stream());
    cb();
};
