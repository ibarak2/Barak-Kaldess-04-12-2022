import { toastService } from "../../services/toast-service"
import { weatherService } from "../../services/weather-service"


export function addToFavorites(miniCity) {
    return (dispatch) => {
        dispatch({ type: "ADD_CITY", miniCity })
    }
}

export function removeFromFavorites(cityId) {
    return (dispatch) => {
        dispatch({ type: "REMOVE_CITY", cityId })
    }
}

export function setCurrentWeather(miniCity) {
    return async (dispatch) => {
        try {
            dispatch(setLoadingTrue())
            const forecastResult = await weatherService.getForecasts(miniCity.id, miniCity.cityName)
            dispatch({ type: "SET_CURRENT_WEATHER", forecastResult })
            dispatch(setLoadingFalse())
        } catch (err) {
            toastService.showErrorMsg()
            dispatch(setLoadingFalse())
        }
    }
}

export function setLoadingTrue() {
    return dispatch => {
        dispatch({ type: "SET_LOADING_TRUE" })
    }
}

export function setLoadingFalse() {
    return dispatch => {
        dispatch({ type: "SET_LOADING_FALSE" })
    }
}