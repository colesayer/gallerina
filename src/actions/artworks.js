import ArtworkApi from '../services/artworkapi.js'

export function fetchArtworks(user_id){
  console.log("in artworks.js fetchArtworks", user_id)
  return function(dispatch){
    dispatch(fetchingArtworks())
    ArtworkApi.fetchArtworks(user_id).then(artworks => {
        dispatch(fetchedArtworks(artworks))
      })
  }
}

function fetchedArtworks(artworks){
  return {
    type: 'FETCHED_ARTWORKS',
    payload: artworks
  }
} 

function fetchingArtworks(){
  return{
    type: 'FETCHING_ARTWORKS'
  }
}


export function createArtwork(params){
  return function(dispatch){
    ArtworkApi.createArtwork(params)
      .then((artwork) => {
        console.log("created new artwork")
        dispatch(saveArtwork(artwork))
      })
  }
}

export function saveArtwork(artwork){
  return {
    type: 'CREATE_ARTWORK',
    payload: artwork
  }
}

export function selectArtwork(artwork){
  return {
    type: 'SELECT_ARTWORK',
    payload: artwork
  }
}
