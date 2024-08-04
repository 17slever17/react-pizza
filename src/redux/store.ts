import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizza from './slices/pizzaSlice'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza
  }
})

type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
