export default class SceneApi{

  static fetchScenes(user_id){
    return fetch(`http://localhost:3000/users/${user_id}/scenes`).then((res) => res.json())
  }
}
