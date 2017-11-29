export function saveScene(scene){
  return {
    type: 'CREATE_SCENE',
    payload: scene
  }
}

export function clearArtworkSelection(){
  return{
    type: 'CLEAR_ARTWORKS',
  }
}
