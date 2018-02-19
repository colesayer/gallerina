export function saveArtworks(artworks){
  return {
    type: 'SAVE_ARTWORKS',
    payload: artworks
  }
}

export function clearSavedArtworks(){
  return {
    type: 'CLEAR_SAVED_ARTWORKS'
  }
}

export function clearArtworkSelection(){
  return{
    type: 'CLEAR_ARTWORKS',
  }
}

export function saveScene(scene){
  return{
    type: 'SAVE_SCENE',
    payload: scene
  }
}
