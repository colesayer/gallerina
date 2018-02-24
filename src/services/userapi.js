const baseUrl = 'https://floating-hamlet-69409.herokuapp.com/'

export default class UserApi {

  static login(params){
    return fetch(`${baseUrl}user_token`, {
      method: "POST",
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
      },
      body: JSON.stringify(params)
    })
      .then((res) => {
        if(res.ok)return res.json()
      })
    }


  static create(params){
    return fetch(`${baseUrl}users/create`, {
      method: "POST",
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
      },
      body: JSON.stringify(params)
    })
    .then((res) => res.json())
    }

  static currentUser(){
    return fetch(`${baseUrl}users/current`, {
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
      .then((res) => res.json())
  }

  static fetchUser(name){
    return fetch(`${baseUrl}api/v1/login`,
      {method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({name: name})
    })
    .then((res) => res.json())
  }

  static logoutUser(){
    localStorage.removeItem('jwtToken')
  }

}
