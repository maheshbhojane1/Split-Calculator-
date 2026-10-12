import { ViteReactSSG } from 'vite-react-ssg'
import './styles.css'
import { routes } from './pages.jsx'
export const createRoot = ViteReactSSG({ routes })
