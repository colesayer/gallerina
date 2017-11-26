export default class UserApi {

  static fetchUser(name){
    return fetch('http://localhost:3000/api/v1/login',
      {method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({name: name})
    })
    .then((res) => res.json())
  }

}
