const { series, parallel } = require("gulp");

const style = require("./tasks/style");
const html = require("./tasks/html");
const server = require("./tasks/server");
const images = require("./tasks/images");
const scripts = require("./tasks/scripts");
const cleaner = require("./tasks/cleaner");
const watch = require("./tasks/watch");

exports.default = series(
	images,
	html,
	style,
	scripts,
	parallel(watch, server)
);

exports.clean = cleaner;
exports.html = html;
exports.server = server;
exports.images = images;
exports.scripts = scripts;
exports.style = style;
exports.watch = watch;
