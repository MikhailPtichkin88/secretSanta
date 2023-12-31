export interface BuildPaths {
  entry: string
  html: string
  output: string
  src: string
  public: string
}
export type BuildMode = 'development' | 'production'

export interface BuildOptions {
  port: number | string
  paths: BuildPaths
  mode: BuildMode
  analizer?: boolean
  project: 'storybook' | 'frontend' | 'jest'
}
