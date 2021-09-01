const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "./node_modules/sql.js-httpvfs/dist/sql-wasm.wasm",
            to: "sql.js-httpvfs/",
          },
          {
            from: "./node_modules/sql.js-httpvfs/dist/sqlite.worker.js",
            to: "sql.js-httpvfs/",
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: require.resolve("@open-wc/webpack-import-meta-loader"),
        },
      ],
    },
  },
};
