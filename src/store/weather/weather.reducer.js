const initialState = {
  favoritesIds: [],
  currentWeather: null,
  isLoading: false
}

export function weatherReducer(state = initialState, action) {
  var newState = state
  var newFavorites = state.favoritesIds
  var idx
  switch (action.type) {
    case "ADD_CITY":
      newFavorites.push(action.miniCity)
      return { ...newState, favoritesIds: [...newFavorites] }

    case "REMOVE_CITY":
      idx = newFavorites.findIndex(element => element.id === action.cityId)
      newFavorites.splice(idx, 1)
      return { ...newState, favoritesIds: [...newFavorites] }

    case "SET_CURRENT_WEATHER":
      return { ...newState, currentWeather: action.forecastResult }

    case "SET_LOADING_TRUE":
      return { ...newState, isLoading: true }

    case "SET_LOADING_FALSE":
      return { ...newState, isLoading: false }

    default:
      return newState
  }

}
