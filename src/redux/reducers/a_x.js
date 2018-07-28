

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

const data={
  list:[],
  policeNum:0,
  policeAdd:0,
  equAdd:0
}

export const fireData = function(state=data, action) {
  switch (action.type) {
      case 'ADD_LIST': {
        return {
          ...state,
          list:action.list
        }
      }

      case 'ADD_EQU': {
        return {
          ...state,
          equAdd:action.equAdd
        }
      }

      case 'POLICE_NUM': {
        return {
          ...state,
          policeNum:action.policeNum
        }
      }

      case 'POLICE_ADD': {
        return {
          ...state,
          policeAdd:action.policeAdd
        }
      }

      default:
        return state;
    }
}