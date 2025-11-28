import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { Provider } from "react-redux";
import { store } from './store/index.js'
import { ThemeProvider } from './contexts/themeContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <ErrorBoundary>
          <ThemeProvider>
            <App />
          </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  </Provider>,
)
