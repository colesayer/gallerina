import SceneApi from '../services/sceneapi.js'


export function fetchScenes(user_id){
  return function(dispatch){
    dispatch(fetchingScenes())
    SceneApi.fetchScenes(user_id).then(scenes => {
        dispatch(fetchedScenes(scenes))
      })
  }
}

export function fetchingScenes(){
  return{
    type: 'FETCHING_SCENES'
  }
}

export function fetchedScenes(scenes){
  return{
    type: 'FETCHED_SCENES',
    payload: scenes
  }
}

export function selectScene(scene){
  return{
    type: 'SELECT_SCENE',
    payload: scene
  }
}

export function deselectScene(){
  return{
    type: 'DESELECT_SCENE'
  }
}
