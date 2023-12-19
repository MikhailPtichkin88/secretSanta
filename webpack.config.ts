import path from 'path'
import { buildWebpack } from './config/build/buildWebpack'
import { BuildMode, BuildPaths } from './config/types/types'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

interface EnvVariables {
  mode: BuildMode
  port: number | string
  analizer: boolean
  project: 'storybook' | 'frontend' | 'jest'
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    html: path.resolve(__dirname, 'public', 'index.html'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  }

  return buildWebpack({
    port: process.env.PORT ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    analizer: env.analizer || false,
    project: env.project || 'frontend',
  })
}
