import React from 'react'
import ReactDOM from 'react-dom/client'
import {router} from './App.tsx'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Contexts/AuthContext.tsx'

import { register } from "swiper/element/bundle"

register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
