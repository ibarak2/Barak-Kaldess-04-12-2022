//TODO currentWeather to null
const initialState = {
  favoritesIds: [],
  currentWeather: {
    cityName: 'Tel Aviv',
    id: '215854',
    forecasts: [
      { time: 1670389200000, description: 'Mostly cloudy', cTemperature: 21.1 },
      { time: 1670475600000, description: 'Mostly sunny', cTemperature: 21.1 },
      { time: 1670562000000, description: 'Mostly sunny', cTemperature: 21.1 },
      { time: 1670648400000, description: 'Sunny', cTemperature: 22 },
      { time: 1670734800000, description: 'Sunny', cTemperature: 23.2 }
    ]
  },
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
