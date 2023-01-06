const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	mode: "development",
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif) $/,
				use: {
					loader: "file-loader",
				},
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, // instead of style-loader
					"css-loader",
				],
			},

			{
				test: /\.js$/,
				exclude: "/node_modules/",
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: { minimize: true },
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "./src/styles/[name].css",
			chunkFilename: "[id].css",
		}),
	],
}
