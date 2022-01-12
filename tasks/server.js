const bs = require("browser-sync");

module.exports = function bs_html() {
	bs.init({
		server: {
			baseDir: "./public",
		},
		port: 8080,
		callbacks: {
			ready: function (err, bs) {},
		},
		open: true,
	});
};
