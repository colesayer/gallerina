export default function rootReducer(
  state = {user: {}, artworks: [], selectedArtworks: [], galleries: [], selectedGallery: {}, scene: [], isLoading: false},
  action
){
  switch(action.type){
    case 'FETCHED_ARTWORKS':
      return {...state, artworks: action.payload, isLoading: false}
    case 'FETCHING_ARTWORKS':
      return {...state, isLoading: true}
    case 'FETCHED_USER':
      return {...state, user: action.payload, isLoading: false}
    case 'FETCHING_USER':
      return {...state, isLoading: true}
    case 'FETCHED_GALLERIES':
      return {...state, galleries: action.payload, isLoading: false}
    case 'CREATE_ARTWORK':
      return {...state, artworks: state.artworks.concat(action.payload)}
    case 'SELECT_ARTWORK':
      return {...state, selectedArtworks: state.selectedArtworks.concat(action.payload)}
    case 'CREATE_GALLERY':
      return {...state, galleries: state.galleries.concat(action.payload)}
    case 'SELECT_GALLERY':
      return {...state, selectedGallery: action.payload}
    case 'CREATE_SCENE':
      return {...state, scene: action.payload}
    case 'CLEAR_ARTWORKS':
      return {...state, selectedArtworks: []}
    default:
      return state
  }
}
