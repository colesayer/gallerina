export default class ArtworkApi {

  static fetchArtworks(){
    return fetch('http://localhost:3000/api/v1/artworks').then((res) => res.json())
  }

  static createArtwork(params){
    return fetch('http://localhost:3000/api/v1/artworks', {method: "post", headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(params)
  }).then((res) => res.json())
  }
}
