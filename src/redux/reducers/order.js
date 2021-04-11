const initialState = {
  listOrder: [],
  token: null,
  errorMsg: '',
  seatOrder: []
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ORDER': {
      return {
        ...state,
        listOrder: action.payload
      };
    }
    case 'GET_ORDER': {
      return {
        ...state,
        listGetOrder: action.payload
      };
    }
    case 'CREATE_TRANSACTION': {
      return {
        ...state,
        message: action.payload
      };
    }
    case 'GET_SEAT': {
      return {
        ...state,
        seatOrder: action.payload
      };
    }
    case 'GET_ALL_ORDER': {
      return {
        ...state,
        allOrder: action.payload
      };
    }
    case 'SET_ORDER_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default orderReducer;
