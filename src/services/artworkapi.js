export default class ArtworkApi {

  static fetchArtworks(user_id){
    return fetch(`http://localhost:3000/users/${user_id}/artworks`).then((res) => res.json())
  }

  static createArtwork(params){
    return fetch(`http://localhost:3000/users/${params.user_id}/artworks`, {method: "post", headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(params)
  }).then((res) => res.json())
  }
 
  static updateArtwork(params){
    return fetch(`http://localhost:3000/users/${params.user_id}/artworks/${params.id}`, {method: "PATCH", headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(params)
  }).then((res) => res.json())
  }




  static deleteArtwork(params){
    return fetch(`http://localhost:3000/users/${params.user_id}/artworks/${params.id}`, {method: "delete", headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(params)
  }).then((res) => res.json())
  }
}
