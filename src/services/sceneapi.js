export default class SceneApi{

  static fetchScenes(user_id){
    return fetch(`http://localhost:3000/users/${user_id}/scenes`).then((res) => res.json())
  }

  static createScene(params){
    return fetch(`http://localhost:3000/users/${params.user_id}/scenes`, {method: "post", headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(params)
  }).then((res) => res.json())
  }

}
