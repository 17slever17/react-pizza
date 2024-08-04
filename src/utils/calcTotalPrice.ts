import { CartItemTypes } from "../redux/slices/cartSlice"

export const calcTotalPrice = (items: CartItemTypes[]) => {
  return items.reduce((sum, item) => {
    return sum + item.quantity * item.price
  }, 0)
}
