import axios from "axios"

export const weatherService = {
    getAutocomplete,
    getForecasts,
    getFavoritesForecasts
}

const API_KEY1 = "w3GuVkhCzakVDrn8cNdtOxhV7a66LTFP"

const BASE_URL = "http://dataservice.accuweather.com/"
const AUTOCOMPLETE_API_URL = `${BASE_URL}locations/v1/cities/autocomplete?apikey=${API_KEY1}&q=`
const FUTURE_FORECASTS_API_URL = `${BASE_URL}forecasts/v1/daily/5day/`
const FUTURE_FORECASTS_API_SETTINGS = `?apikey=${API_KEY1}&metric=true`
const SINGLE_FORECAST_API_URL = `${BASE_URL}currentconditions/v1/`
const SINGLE_FORECAST_API_SETTINGS = `?apikey=${API_KEY1}`

async function getFavoritesForecasts(favoritesIdsArray) {
    if (!favoritesIdsArray.length) return null
    const favoritesData = []
    for (let i = 0; i < favoritesIdsArray.length; i++) {
        const result = await axios.get(SINGLE_FORECAST_API_URL + favoritesIdsArray[i].id + SINGLE_FORECAST_API_SETTINGS)
        const newForecast = {
            id: favoritesIdsArray[i].id,
            cityName: favoritesIdsArray[i].cityName,
            cTemperature: result.data[0].Temperature.Metric.Value,
            description: result.data[0].WeatherText
        }
        favoritesData.push(newForecast)
    }

    return favoritesData
}

async function getForecasts(cityId, cityName) {
    const result = await axios.get(FUTURE_FORECASTS_API_URL + cityId + FUTURE_FORECASTS_API_SETTINGS)
    let newForecast = {
        cityName,
        id: cityId,
    }
    newForecast.forecasts = result.data.DailyForecasts.reduce((acc, curr) => {
        const newDay = {
            time: curr.EpochDate * 1000,
            description: curr.Day.IconPhrase,
            cTemperature: curr.Temperature.Maximum.Value
        }
        acc.push(newDay)
        return acc
    }, [])

    return newForecast
}

async function getAutocomplete(value) {
    const result = await axios.get(AUTOCOMPLETE_API_URL + value)
    const relevantCities = result.data.reduce((acc, curr) => {
        const newCity = {
            cityName: curr.AdministrativeArea.LocalizedName,
            countryName: curr.Country.LocalizedName,
            id: curr.Key
        }
        acc.push(newCity)
        return acc
    }, [])

    return relevantCities
}
