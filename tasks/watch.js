const { watch, series } = require('gulp');

const style = require("./style");
const html = require("./html");
const images = require("./images");
const scripts = require("./scripts");

module.exports = function watching (cb) {
	watch("./app/sass/**/*.scss", series(style));
	watch("./app/js/**/*.js", series(scripts));
	watch("./app/*.{html,htm}", series(html));
	watch("./app/img/**/*", series(images));
	cb();
};