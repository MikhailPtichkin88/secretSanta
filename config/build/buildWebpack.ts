import webpack from 'webpack'
import { buildDevServer } from './buildDevServer'
import { BuildOptions } from '../types/types'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { paths, mode } = options
  const isDev = mode === 'development'

  return {
    mode: mode ?? 'development',
    entry: paths.entry,
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: '/',
    },
    plugins: buildPlugins(options),
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev ? buildDevServer(options) : undefined,
    // optimization: {
    //   runtimeChunk: "single",
    // },
  }
}
