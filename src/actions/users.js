import UserApi from '../services/userapi.js'
// export function createArtwork(params){
//   return function(dispatch){
//     ArtworkApi.createArtwork(params)
//       .then((artwork) => {
//         dispatch({})
//       })
//   }
// }

export function fetchUser(name){
  console.log("in fetchUser:", name)
  return function(dispatch){
    dispatch(fetchingUser())
    UserApi.fetchUser(name)
      .then(user => {
        console.log("fetched user", user)
        const userParams = {id: user.id, name: user.name, email_address: user.email_address}
        const userArtworks = user.artworks
        const userGalleries = user.galleries

        dispatch(fetchedUser(userParams))
        dispatch(fetchedArtworks(userArtworks))
        dispatch(fetchedGalleries(userGalleries))
      })
  }
}

// {id: 1, name: "Cole Sayer", email_address: "colesayerstudio@gmail.com", artworks: Array(3), galleries: Array(1)}

function fetchedUser(user){
  return{
    type: 'FETCHED_USER',
    payload: user
  }
}

function fetchingUser(){
  return{
    type: 'FETCHING_USER'
  }
}

function fetchedArtworks(artworks){
  return {
    type: 'FETCHED_ARTWORKS',
    payload: artworks
  }
}

function fetchedGalleries(galleries){
  return{
    type: 'FETCHED_GALLERIES',
    payload: galleries
  }
}
