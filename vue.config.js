// 需要导出一个对象
module.exports = {
  // 需要更改less中变量的配置
  css: {
    // css关联
    loaderOptions: {
      // 所有的关于样式loader相关的选项
      less: {
        // 这里的选项些什么？
        // modifyVars

        modifyVars: {
          // 需要直接覆盖变量，变量名不需要@
          blue: '#3296fa'

          // 或者可以通过less文件覆盖（文件路径为绝对路径）
        }
      }
    }
  },
  // 删除生产环境的console
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  publicPath: './'// 打包后的引用地址
}
