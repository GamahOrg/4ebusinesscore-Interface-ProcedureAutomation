const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const packages = [];

packages.push(path.join(__dirname, "../shared"));
packages.push(path.join(__dirname, "../automation"));
packages.push(path.join(__dirname, "../connect"));

module.exports = {
  webpack: {
    configure: (webpackConfig, arg) => {
      if (
        typeof window !== "undefined" &&
        window._env_ &&
        window._env_.NODE_ENV === "production"
      ) {
        webpackConfig.devtool = false;

        webpackConfig.optimization = {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: { drop_console: true },
                output: { comments: false },
              },
            }),
            new CssMinimizerPlugin(),
          ],
        };
      }

      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = include.concat(packages);
      }

      return webpackConfig;
    },
  },
};
