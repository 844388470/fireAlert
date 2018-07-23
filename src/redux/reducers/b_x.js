import { createStore,combineReducers } from "redux";

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

const ADD_TO_PROD='ADD_TO_PROD'

export const productsReducer = function(state=initialState, action) {
    switch (action.type) {
        case ADD_TO_PROD: {
          return {
              ...state,
              cart: [...state.cart, action.payload]
          }
        }
    
        default:
          return state;
      }
}