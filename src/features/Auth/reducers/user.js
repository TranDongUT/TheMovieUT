const initState = {
  userInfor: "",
  favoriteList: [],
};

function userReducer(state = initState, action) {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        userInfor: action.payload,
      };
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favoriteList: action.payload,
      };
    default: {
      return state; // We return the default state here
    }
  }
}

export default userReducer;
