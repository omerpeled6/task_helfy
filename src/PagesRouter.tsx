import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import './index.css'
import Products from './pages/Products'
import Trivia from './pages/Trivia'
import CreateIngredient from './pages/CreateIngredient'
import CreateSalad from './pages/CreateSalad'

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to the App!</h1>
      <p>Please choose a route to navigate:</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/products">
          <button>Products</button>
        </Link>
        <Link to="/create-ingredient">
          <button>Create Ingredient</button>
        </Link>
        <Link to="/create-salad">
          <button>Create Salad</button>
        </Link>
        <Link to="/trivia">
          <button>Trivia</button>
        </Link>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/trivia',
    element: <Trivia />,
  },
  {
    path: '/create-ingredient',
    element: <CreateIngredient />,
  },
  {
    path: '/create-salad',
    element: <CreateSalad />,
  },
])

const PagesRouter = () => {
  return <RouterProvider router={router} />
}

export default PagesRouter
