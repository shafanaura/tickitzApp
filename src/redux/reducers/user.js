const initialState = {
  userDetail: {},
  errorMsg: '',
  message: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DETAIL_USER': {
      return {
        ...state,
        userDetail: action.payload,
        message: action.message
      };
    }
    case 'SET_USER_MESSAGE': {
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

export default userReducer;
