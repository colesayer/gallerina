export function saveScene(scene){
  return {
    type: 'CREATE_SCENE',
    payload: scene
  }
}

export function clearScene(){
  return {
    type: 'CLEAR_SCENE'
  }
}

export function clearArtworkSelection(){
  return{
    type: 'CLEAR_ARTWORKS',
  }
}
