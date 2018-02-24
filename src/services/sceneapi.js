const baseUrl = 'https://floating-hamlet-69409.herokuapp.com/'

export default class SceneApi{

  static fetchScenes(user_id){
    return fetch(`${baseUrl}users/${user_id}/scenes`).then((res) => res.json())
  }

  static createScene(params){
    return fetch(`${baseUrl}users/${params.user_id}/scenes`, {method: "post", headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(params)
  }).then((res) => res.json())
  }

  static deleteScene(params){
    return fetch(`${baseUrl}users/${params.user}/scenes/${params.scene}`, {method: "DELETE", headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(params)
  }).then((res) => res.json())
  }
}
