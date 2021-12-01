export const addUser = obj => { 
  return dispatch => {
    dispatch({
      type: 'ADD_USER', 
      payload: obj
    })}
}

export const fetchUser = token => async dispatch => {
  try {
    let resp = await fetch('/db/user', {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    })
    const userData = await resp.json();
    if (userData.error) {
      console.log(userData.error)
      // logOut();
      return;
    }
    dispatch(addUser(userData))
  } catch (err){
    console.log(err)
  }
}