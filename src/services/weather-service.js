import axios from "axios"

export const weatherService = {
    getAutocomplete,
    getForecasts,
}


const API_KEY1 = "w3GuVkhCzakVDrn8cNdtOxhV7a66LTFP"


const BASE_URL = "http://dataservice.accuweather.com/"
const AUTOCOMPLETE_API_URL = `${BASE_URL}locations/v1/cities/autocomplete?apikey=${API_KEY1}&q=`
const FUTURE_FORECASTS_API_URL = `${BASE_URL}forecasts/v1/daily/5day/`
const FUTURE_FORECASTS_API_SETTINGS = `?apikey=${API_KEY1}&metric=true`



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

//TODO REMOVE
const autocomplete = [
    { cityName: 'Tel Aviv', countryName: 'Israel', id: '215854' },
    { cityName: 'Jambi', countryName: 'Indonesia', id: '3431644' },
    { cityName: 'South West', countryName: 'Singapore', id: '300558' },
    { cityName: 'Telford and Wrekin', countryName: 'United Kingdom', id: '325876' },
    { cityName: 'Kakheti', countryName: 'Georgia', id: '169072' },
    { cityName: 'Telšiai', countryName: 'Lithuania', id: '230611' },
    { cityName: 'Pará', countryName: 'Brazil', id: '2723742' },
    { cityName: 'Atlántida', countryName: 'Honduras', id: '186933' },
    { cityName: 'West Java', countryName: 'Indonesia', id: '3453754' },
    { cityName: 'West Java', countryName: 'Indonesia', id: '3453755' },
]

//TODO REMOVE
const currentWeather = {
    cityName: 'Tel Aviv',
    id: '215854',
    forecasts: [
        { time: 1670389200000, description: 'Mostly cloudy', cTemperature: 21.1 },
        { time: 1670475600000, description: 'Mostly sunny', cTemperature: 21.1 },
        { time: 1670562000000, description: 'Mostly sunny', cTemperature: 21.1 },
        { time: 1670648400000, description: 'Sunny', cTemperature: 22 },
        { time: 1670734800000, description: 'Sunny', cTemperature: 23.2 }
    ]
}
