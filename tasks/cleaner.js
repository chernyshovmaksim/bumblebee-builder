const del = require("del");

module.exports = function clean() {
	return del(["./public"], { force: true });
};
