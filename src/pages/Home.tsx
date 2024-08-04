/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas, PizzaItem, setLoading } from '../redux/slices/pizzaSlice'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components'
import { sortList } from '../components/Sort'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { items, status, pageCount } = useAppSelector((state) => state.pizza)
  const { searchValue, categoryId, sort, currentPage } = useAppSelector((state) => state.filter)
  const sortType = sort.sortProperty

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    window.scrollTo(0, 0)
    const category = categoryId ? `category=${categoryId}&` : ''
    dispatch(
      fetchPizzas({
        currentPage,
        category,
        sortType,
        searchValue
      })
    )
  }

  useEffect(() => {
    console.log('render')
    if (categoryId !== undefined && currentPage !== undefined) {
      if (isMounted.current) {
        const queryString = qs.stringify({
          sortProperty: sortType,
          categoryId,
          currentPage
        })
        navigate(`?${queryString}`)
      } else isMounted.current = true
    }
  }, [categoryId, sortType, currentPage])

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)
      dispatch(
        setFilters({
          ...params,
          sort,
          pageCount
        })
      )
      isSearch.current = true
    } else dispatch(setCategoryId(0))
    return () => {
      dispatch(setLoading())
      dispatch(setCategoryId(0))
      dispatch(setCurrentPage(1))
    }
  }, [])

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    console.log('get')
    if (!isSearch.current) {
      getPizzas()
    } else isSearch.current = false
  }, [categoryId, sortType, currentPage, searchValue])

  const pizzas = items.map((obj: PizzaItem) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(4)].map((_, id) => <Skeleton key={id} />)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          categoryValue={categoryId}
          onChangeCategory={onChangeCategory}
          setCurrentPage={setCurrentPage}
        />
        <Sort sortName={sort.name} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить пиццы.</p>
          <p>Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className={`content__items ${status === 'loading' ? 'pizza-skeleton' : ''}`}>
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination pageCount={pageCount} currentPage={currentPage} setCurrentPage={onChangePage} />
    </div>
  )
}

export default Home
