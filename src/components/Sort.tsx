import { memo, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { setSort } from '../redux/slices/filterSlice'

type SortItem = { name: string; sortProperty: ESortProperty }

type TSort = {
  sortName: string
}

export enum ESortProperty {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title'
}

export const sortList: SortItem[] = [
  { name: 'популярности ↓', sortProperty: ESortProperty.RATING_ASC },
  { name: 'популярности ↑', sortProperty: ESortProperty.RATING_DESC },
  { name: 'цене ↓', sortProperty: ESortProperty.PRICE_ASC },
  { name: 'цене ↑', sortProperty: ESortProperty.PRICE_DESC },
  { name: 'алфавиту А-Я', sortProperty: ESortProperty.TITLE_ASC },
  { name: 'алфавиту Я-А', sortProperty: ESortProperty.TITLE_DESC }
]
const Sort: React.FC<TSort> = memo(({ sortName }) => {
  const dispatch = useAppDispatch()
  const sortRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj))
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false)
      }
    }
    if (open) document.body.addEventListener('click', handleClickOutside)
    else document.body.removeEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [open])

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <svg
          className={!open ? 'isOpenSort' : ''}
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortName}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj, id) => (
              <li
                key={id}
                className={sortName === obj.name ? 'active' : ''}
                onClick={() => onClickListItem(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})

export default Sort
