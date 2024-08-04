import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ESortProperty, sortList } from '../../components/Sort'
import { categories } from '../../components/Categories'

export type Sort = {
  name: string
  sortProperty: ESortProperty
}

interface FilterSliceState {
  searchValue: string
  categoryId: number | undefined
  currentPage: number | undefined
  sort: Sort
}

export const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: undefined,
  currentPage: undefined,
  sort: { name: 'популярности ↓', sortProperty: ESortProperty.RATING_DESC }
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
      state.currentPage = 1
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
      state.currentPage = 1
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
      state.currentPage = 1
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<any>) {
      state.sort = sortList.includes(action.payload.sort)
        ? action.payload.sort
        : { name: 'популярности ↓', sortProperty: ESortProperty.RATING_DESC }
      state.categoryId =
        /^\d+$/.test(action.payload.categoryId) && Number(action.payload.categoryId) <= categories.length
          ? Number(action.payload.categoryId)
          : 0
      state.currentPage =
        /^\d+$/.test(action.payload.currentPage) &&
        Number(action.payload.currentPage) < action.payload.pageCount &&
        Number(action.payload.currentPage) > 0
          ? Number(action.payload.categoryId)
          : 1
    }
  }
})

export const { setSearchValue, setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer
