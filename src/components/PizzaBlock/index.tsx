import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { addItem, CartItemTypes } from '../../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
import React from 'react'
import { PizzaItem } from '../../redux/slices/pizzaSlice'

const typeNames = ['тонкое', 'традиционное']

const PizzaBlock: React.FC<PizzaItem> = ({ id, title, price, imageUrl, sizes, types }) => {
  const dispatch = useAppDispatch()
  const [activeType, setActiveType] = useState(types[0])
  const [activeSize, setActiveSize] = useState(0)
  const cartItem = useAppSelector((state) =>
    state.cart.items.find(
      (item: CartItemTypes) =>
        item.id === id && item.size === sizes[activeSize] && item.type === typeNames[activeType]
    )
  )

  const quantity = cartItem !== undefined ? cartItem.quantity : 0

  const onClickAdd = () => {
    const item: CartItemTypes = {
      id,
      title,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      price: price[activeSize],
      quantity: 1
    }
    dispatch(addItem(item))
  }

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <Link to={'/pizza/' + id}>
          <div className='pizza-block__image-wrapper'>
            <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
          </div>
          <h4 className='pizza-block__title'>{title}</h4>
        </Link>
        <div className='pizza-block__selector'>
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                className={activeType === typeId ? 'active' : ''}
                onClick={() => setActiveType(typeId)}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, id) => (
              <li
                key={id}
                className={activeSize === id ? 'active' : ''}
                onClick={() => setActiveSize(id)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>{price[activeSize]} ₽</div>
          <button onClick={onClickAdd} className='button button--outline button--add button--addToCart'>
            <span>Добавить</span>
            {quantity > 0 && <i>{quantity}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
