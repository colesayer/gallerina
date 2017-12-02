import UserApi from '../services/userapi.js'

export function loginUser(params){
  return function(dispatch){
    dispatch(fetchingUser())
    UserApi.login(params)
      .then(user => {
        localStorage.setItem('jwtToken', user.jwt)
        dispatch(fetchUser())
      })
  }
}

export function createUser(params){
  return function(dispatch){
    dispatch(fetchingUser())
    UserApi.create(params)
      .then(user => {
        console.log("in createUser:", user)
      })
  }
}

export function fetchUser(){
  return function(dispatch){
    dispatch(fetchingUser())
    UserApi.currentUser()
      .then(user => {
        const userInfo = {id: user.id, email: user.email, name: user.name}
        dispatch(fetchedUser(userInfo))
      })
  }
}


function fetchedUser(user){
  return{
    type: 'FETCHED_USER',
    payload: user
  }
}


function fetchingUser(){
  return{
    type: 'FETCHING_USER'
  }
}
