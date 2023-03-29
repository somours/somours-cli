const { defineConfig } = require("@vue/cli-service");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  // outputDir: "template-vue3-webpack-h5",
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("router", resolve("src/router"))
      .set("utils", resolve("src/utils"))
      .set("store", resolve("src/store"))
      .set("views", resolve("src/views"));
  },
  css: {
    loaderOptions: {},
  },
  configureWebpack: {
    plugins: [],
  },
  devServer: {
    port: 7711,
    proxy: {},
  },
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
});
