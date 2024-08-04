/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{ imageUrl: string; title: string; price: [] }>()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://3c1d1f0b0f750f8f.mokky.dev/items/' + id)
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])
  if (!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div className='container container__fullPizza'>
      <img src={pizza.imageUrl} alt='' />
      <h2>{pizza.title}</h2>
      <div style={{ display: 'flex', gap: '30px' }}>
        {pizza.price && pizza.price.map((num) => <h3>{num} ₽</h3>)}
      </div>
      <Link to='/'>
        <button className='button button--outline button--add'>
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza
