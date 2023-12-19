import { BuildOptions } from '../types/types'
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin'

export const buildBabelLoader = (options: BuildOptions) => {
  const isProd = options.mode === 'production'
  const plugins = []

  if (isProd) {
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        props: ['data-testid'],
      },
    ])
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      // пресеты вынесены в babel.config.json для универсальности использования (jest)
      options: {
        plugins: plugins.length ? plugins : undefined,
      },
    },
  }
}
