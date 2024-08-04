import React, { memo } from 'react'

type CategoriesProps = {
  categoryValue: number | undefined
  onChangeCategory: (id: number) => void
  setCurrentPage: (page: number) => void
}

export const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC<CategoriesProps> = memo(
  ({ categoryValue, onChangeCategory, setCurrentPage }) => {
    return (
      <div className='categories'>
        <ul>
          {categories.map((categoryName, id) => (
            <li
              key={id}
              className={categoryValue === id ? 'active' : ''}
              onClick={() => {
                onChangeCategory(id)
                setCurrentPage(1)
              }}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

export default Categories
