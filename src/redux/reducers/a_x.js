

const initialState = {
    cart: [
      {
        product: 'bread 700g',
        quantity: 2,
        unitCost: 90
      },
      {
        product: 'milk 500ml',
        quantity: 1,
        unitCost: 47
      }
    ]
}

export const cartReducer = function(state=initialState, action) {
    switch (action.type) {
        case 'ADD_TO_CART': {
          return {
              ...state,
              cart: [...state.cart, action.payload]
          }
        }
    
        default:
          return state;
      }
}

export const colorReducer = function(state='red', action) {
  switch (action.type) {
      case 'CHANGE_COLOR': {
        return action.payload
      }
  
      default:
        return state;
    }
}