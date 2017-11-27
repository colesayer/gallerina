import ArtworkApi from '../services/artworkapi.js'

export function fetchArtworks(){
  return function(dispatch){
    dispatch(fetchingArtworks())
    ArtworkApi.fetchArtworks().then(artworks => {
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
