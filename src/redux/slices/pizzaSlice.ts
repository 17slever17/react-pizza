import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

type FetchPizzasArgs = {
  searchValue: string
  category: string
  currentPage: number | undefined
  sortType: '-rating' | 'rating' | '-price' | 'price' | '-title' | 'title'
}

type DataArgs = { items: PizzaItem[]; meta: { total_pages: number } }

export type PizzaItem = {
  category: number
  rating: number
  id: number
  title: string
  price: number[]
  imageUrl: string
  sizes: number[]
  types: number[]
}

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

interface PizzaSliceState {
  items: PizzaItem[]
  status: Status
  pageCount: number
}

export const fetchPizzas = createAsyncThunk<DataArgs, FetchPizzasArgs>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { currentPage, category, sortType, searchValue } = params
    const { data } = await axios.get<DataArgs>(
      `https://3c1d1f0b0f750f8f.mokky.dev/items?page=${currentPage}&limit=4&${category}sortBy=${sortType}&title=*${searchValue}`
    )
    return data
  }
)

export const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
  pageCount: 1
}

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setLoading(state) {
      state.status = Status.LOADING
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, () => {
        // some code
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.pageCount = action.payload.meta.total_pages
        state.status = Status.SUCCESS
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR
        state.items = []
      })
  }
})

export const { setLoading } = pizzaSlice.actions

export default pizzaSlice.reducer
