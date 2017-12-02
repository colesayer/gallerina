import GalleryApi from '../services/galleryapi.js'

export function fetchGalleries(user_id){
  console.log("in galleries.js fetchGalleries", user_id)
  return function(dispatch){
    dispatch(fetchingGalleries())
    GalleryApi.fetchGalleries(user_id).then(galleries => {
        console.log("fetched galleries", galleries)
        dispatch(fetchedGalleries(galleries))
      })
  }
}

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

function fetchingGalleries(){
  return{
    type: 'FETCHING_GALLERIES'
  }
}

export function fetchedGalleries(galleries){
  return{
    type: 'FETCHED_GALLERIES',
    payload: galleries
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
