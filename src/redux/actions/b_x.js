

export function addToProd(product, quantity, unitCost) {
    return {
      type: 'ADD_TO_PROD',
      payload: { product, quantity, unitCost }
    }
  }