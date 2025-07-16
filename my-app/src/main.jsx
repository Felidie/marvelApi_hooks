import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './style/style.scss'
import App from './components/app/App'



createRoot(document.getElementById('root')).render(
    <App />
)
