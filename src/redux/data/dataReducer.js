const initialState = {
  loading: false,
  totalSupply: 0,
  paused: false,
  // isWhitelisted: false,
  onlyWhitelisted: true,
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        totalSupply: action.payload.totalSupply,
        paused: action.payload.paused,
        // isWhitelisted: action.payload.isWhitelisted,
        onlyWhitelisted:action.payload.onlyWhitelisted,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
