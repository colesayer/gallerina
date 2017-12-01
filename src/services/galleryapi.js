export default class GalleryApi{

  static fetchGalleries(user_id){
    return fetch(`http://localhost:3000/users/${user_id}/galleries`).then((res) => res.json())
  }

  static createGallery(params){
    return fetch(`http://localhost:3000/users/${params.user_id}/galleries`, {method: "post", headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(params)
  }).then((res) => res.json())
  }

}
