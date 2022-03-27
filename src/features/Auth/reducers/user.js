const initState = {
  isSignIn: "",
  favoriteList: [],
};

function userReducer(state = initState, action) {
  console.log(state);
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignIn: action.payload,
      };
    default: {
      return state; // We return the default state here
    }
  }
}

export default userReducer;
