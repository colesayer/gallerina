export default class GalleryApi{

  static createGallery(params){
    return fetch('http://localhost:3000/api/v1/galleries', {method: "post", headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify(params)
  }).then((res) => res.json())
  }

}
