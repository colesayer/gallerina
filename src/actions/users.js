import UserApi from '../services/userapi.js'
import { clearSavedArtworks } from './threeviews.js'

export function loginUser(params){
  return function(dispatch){
    dispatch(fetchingUser())
    UserApi.login(params)
      .then(user => {
        if(user){
          localStorage.setItem('jwtToken', user.jwt)
          dispatch(fetchUser())
        } else {
          dispatch(handleMessage({login: "Incorrect Email or Password"}))
        }
      })
  }
}

export function createUser(params){
  return function(dispatch){
    dispatch(fetchingUser())
    UserApi.create(params)
      .then(user => {
        if(user.errors){
          dispatch(handleMessage({signup: user.errors}))
        } else {
          dispatch(handleMessage({signup: "SignUp Successful. Please LogIn!"}))
        }
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
        dispatch(clearSavedArtworks())
      })
  }
}


function fetchedUser(user){
  return{
    type: 'FETCHED_USER',
    payload: user
  }
}

function handleMessage(message){
  return{
    type: 'HANDLE_MESSAGE',
    payload: message
  }
}


function fetchingUser(){
  return{
    type: 'FETCHING_USER'
  }
}


export function logoutUser(){
  return{
    type: 'LOGOUT_USER'
  }
}
