import { LazyExoticComponent, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { ErrorBoundary } from '@/app/providers/ErrorBoundary'
import { ThemeProvider } from './app/providers/ThemeProvider'
import './app/styles/index.scss'

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
  <BrowserRouter>
    <ErrorBoundary>
      <ThemeProvider>
        <div className="app app_light_theme">sdfjahsdfuashd</div>
      </ThemeProvider>
    </ErrorBoundary>
  </BrowserRouter>
)
