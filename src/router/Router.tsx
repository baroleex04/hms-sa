import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from './routes'

const RouterContent = () => {
  const element = useRoutes(routes)
  return element
}

export const Router = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  )
}
