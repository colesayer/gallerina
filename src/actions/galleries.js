import GalleryApi from '../services/galleryapi.js'

export function createGallery(params){
  console.log("in createGallery:", params)
  return function(dispatch){
    GalleryApi.createGallery(params)
      .then((gallery) => {
        console.log("created new gallery")
        dispatch(saveGallery(gallery))
      })
  }
}

export function saveGallery(gallery){
  return {
    type: 'CREATE_GALLERY',
    payload: gallery
  }
}

export function selectGallery(gallery){
  return {
    type: 'SELECT_GALLERY',
    payload: gallery
  }
}
