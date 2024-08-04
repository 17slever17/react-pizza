import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './scss/app.scss'
import { MainLayout } from './components'

import Home from './pages/Home'
const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'))
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />}></Route>
        <Route
          path='cart'
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        ></Route>
        <Route
          path='pizza/:id'
          element={
            <Suspense fallback={<div>Идёт загрузка пиццы...</div>}>
              <FullPizza />
            </Suspense>
          }
        ></Route>
        <Route
          path='*'
          element={
            <Suspense fallback={<div>Идёт загрузка страницы...</div>}>
              <NotFound />
            </Suspense>
          }
        ></Route>
      </Route>
    </Routes>
  )
}
export default App
