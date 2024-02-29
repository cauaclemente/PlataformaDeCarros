import { createBrowserRouter } from "react-router-dom"

import { Layout } from "./components/layout"

import Home from "./pages/Home/Home"
import CarDetail from "./pages/Car/CarDetail"
import Dashboard from "./pages/Dashboard/Dashboard"
import New from "./pages/Dashboard/new/New"
import Login from "./pages/Login/Login"
import Cadastro from "./pages/Register/Cadastro"

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/car/:id",
        element: <CarDetail />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/dashboard/new",
        element: <New />
      },
      {

      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Cadastro />
  }
])

export {router}