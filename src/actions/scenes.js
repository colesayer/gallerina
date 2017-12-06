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

export function createRender(render){
  return{
    type: 'CREATE_RENDER',
    payload: render
  }
}

export function createScene(params){
  return function(dispatch){
    SceneApi.createScene(params)
      .then((scene) => {
        dispatch(saveScene(scene))
      })
  }
}

export function saveScene(scene){
  return{
    type: 'CREATE_SCENE',
    payload: scene
  }
}
