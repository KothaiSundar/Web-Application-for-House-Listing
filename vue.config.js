const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true), // Enable or disable Vue Options API
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // Enable or disable Vue Devtools in production
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true), // Add this line
      }),
    ],
  },
});
