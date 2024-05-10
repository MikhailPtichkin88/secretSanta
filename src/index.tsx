import { LazyExoticComponent, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from './app/providers/ThemeProvider'
import './app/styles/index.scss'
import './shared/config/i18n/i18n'
import { App } from './app/App'
import { StoreProvider } from './app/providers/StoreProvider'

const root = document.getElementById('root')
if (!root) {
  throw new Error('root not found')
}
export type RouteElement =
  | LazyExoticComponent<() => ReactNode>
  | ReactNode
  | JSX.Element

const container = createRoot(root)
container.render(
  <StoreProvider>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StoreProvider>
)
