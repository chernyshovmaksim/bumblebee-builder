const { src, dest } = require("gulp");

//===================================================================
//===================================================================

const bs = require("browser-sync");
const webpack = require("webpack-stream");
const rename = require("gulp-rename");

module.exports = function scripts() {
	return src(["./app/js/app.js"])
		.pipe(
			webpack({
				mode: "production",
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
						{
							test: /\.css$/i,
							use: ["style-loader", "css-loader"],
						},
						{
							test: /\.s[ac]ss$/i,
							use: [
								// Creates `style` nodes from JS strings
								"style-loader",
								// Translates CSS into CommonJS
								"css-loader",
								// Compiles Sass to CSS
								"sass-loader",
							],
						},
					],
				},
			})
		)
		.pipe(rename("app.min.js"))
		.pipe(dest("./public/js"))
		.pipe(bs.stream());
};
