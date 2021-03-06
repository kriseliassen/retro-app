
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.payload;
    case 'UPDATE_USER':
      return {...state, ...action.payload};
    case 'REMOVE_USER':
      return {};
    default:
      return state;
  }
};

export default userReducer;