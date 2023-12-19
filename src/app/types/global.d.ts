declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
  import React from 'react'
  const SVG: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default SVG
}

declare const __IS_DEV__: boolean
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest'
declare const __API__: string
