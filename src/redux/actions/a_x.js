

export function addToCart(product, quantity, unitCost) {
  return {
    type: 'ADD_TO_CART',
    payload: { product, quantity, unitCost }
  }
}

export function changeColor(color) {
  return {
    type: 'CHANGE_COLOR',
    payload: color
  }
}