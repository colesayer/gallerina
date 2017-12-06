export default function rootReducer(
  state = {
  user: {}, message: {},
  artworks: [], selectedArtworks: [], savedArtworks: [],
  galleries: [], selectedGallery: {},
  savedScene: [], scenes: [], selectedScene: {}, renders: [],
  isLoading: false},
  action
){
  switch(action.type){
    case 'FETCHED_ARTWORKS':
      return {...state, artworks: action.payload, isLoading: false}
    case 'FETCHING_ARTWORKS':
      return {...state, isLoading: true}
    case 'FETCHED_USER':
      return {...state, user: action.payload, message: {}, isLoading: false}
    case 'FETCHING_USER':
      return {...state, isLoading: true}
    case 'HANDLE_MESSAGE':
      return {...state, message: action.payload}
    case 'LOGOUT_USER':
      return {...state, user: {}, message: {}, artworks: [], selectedArtworks: [], galleries: [], selectedGallery: {}, scene: [], isLoading: false}
    case 'FETCHED_GALLERIES':
      return {...state, galleries: action.payload, isLoading: false}
    case 'FETCHING_GALLERIES':
      return {...state, isLoading: true}
    case 'CREATE_ARTWORK':
      return {...state, artworks: state.artworks.concat(action.payload)}
    case 'SELECT_ARTWORK':
      return {...state, selectedArtworks: state.selectedArtworks.concat(action.payload)}
    case 'DESELECT_ARTWORK':
      return {...state, selectedArtworks: state.selectedArtworks.filter(artwork => artwork !== action.payload)}
    case 'REMOVE_ARTWORK_FROM_SCENE':
      return {...state, savedArtworks: state.savedArtworks.filter(artwork => artwork.name.id !== action.payload.id)}
    case 'CREATE_GALLERY':
      return {...state, galleries: state.galleries.concat(action.payload)}
    case 'SELECT_GALLERY':
      return {...state, selectedGallery: action.payload}
    case 'DESELECT_GALLERY':
      return {...state, selectedGallery: {}}
    case 'SAVE_ARTWORKS':
      return {...state, savedArtworks: action.payload}
    case 'CLEAR_SAVED_ARTWORKS':
      return {...state, savedArtworks: []}
    case 'CLEAR_ARTWORKS':
      return {...state, selectedArtworks: []}
    case 'SAVE_SCENE':
      return {...state, savedScene: action.payload}
    case 'CREATE_SCENE':
      return {...state, scenes: state.scenes.concat(action.payload)}
    case 'FETCHING_SCENES':
      return {...state, isLoading: true}
    case 'FETCHED_SCENES':
      return {...state, scenes: action.payload, isLoading: false}
    case 'SELECT_SCENE':
      return {...state, selectedScene: action.payload}
    case 'DESELECT_SCENE':
      return {...state, selectedScene: {}}
    case 'CREATE_RENDER':
      return {...state, renders: [action.payload]}
    default:
      return state
  }
}
