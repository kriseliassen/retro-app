export const addUser = obj => { 
  return dispatch => {
    dispatch({
      type: 'ADD_USER', 
      payload: obj
    })}
}

export const removeUser = () => { 
  return dispatch => {
    localStorage.removeItem('retroToken');
    dispatch({
      type: 'REMOVE_USER', 
      payload: {}
    })}
}

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const fetchUser = token => async dispatch => {
  try {
    let resp = await fetch(`${SERVER_URL}/db/user`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    })
    const userData = await resp.json();
    if (userData.error) {
      console.log(userData.error)
      dispatch(removeUser())
      return;
    }
    dispatch(addUser(userData))
  } catch (err){
    console.log(err)
    dispatch(removeUser())
  }
}