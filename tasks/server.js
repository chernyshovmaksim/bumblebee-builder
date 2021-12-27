const bs = require('browser-sync');

module.exports = function bs_html() {
	bs.init({
		server: {
			baseDir: './public',
		},
		callbacks: {
			ready: function (err, bs) {}
		},
		open: true
	})
}