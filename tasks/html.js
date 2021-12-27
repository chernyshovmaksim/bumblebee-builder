const { src, dest } = require("gulp");

//===================================================================
//===================================================================

const bs = require("browser-sync");

module.exports = function html() {
	return src("./app/*.html").pipe(dest("./public")).pipe(bs.stream());
};
