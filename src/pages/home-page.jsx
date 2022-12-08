import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { SearchBar } from "../cmps/search-bar"
import { WeatherDetails } from "../cmps/weather-details"
import { toastService } from "../services/toast-service"
import { weatherService } from "../services/weather-service"
import { addToFavorites, removeFromFavorites, setCurrentWeather, setLoadingFalse } from "../store/weather/weather.actions"

export const HomePage = () => {

    const [autoCompleteResults, setAutoCompleteResults] = useState()
    const { favoritesIds, currentWeather, isLoading } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()
    const debounceTimeoutRef = useRef()
    const searchBarRef = useRef()

    useEffect(() => {
        dispatch(setLoadingFalse())
        if (!currentWeather) {
            onSelectLocation("215854", "Tel Aviv")
        }
    }, [])

    // Autocomplete API request 
    const handleChange = (ev) => {
        const value = ev.target.value
        const regex = /^[a-zA-Z]+$/
        if (!regex.test(value)) {
            searchBarRef.current.value = value.slice(0, -1)
            return
        }
        clearInterval(debounceTimeoutRef.current)

        debounceTimeoutRef.current = setTimeout(async () => {
            try {
                const res = await weatherService.getAutocomplete(value)
                setAutoCompleteResults(res)
            } catch (err) {
                toastService.showErrorMsg()
            }
            // deBounce time - changeable
        }, 500)
    }

    // 5 Days forcasts API request
    const onSelectLocation = async (elementId, cityName) => {
        const miniCity = {
            id: elementId,
            cityName
        }
        dispatch(setCurrentWeather(miniCity))
        onClearSearchBar()
    }

    const onClearSearchBar = () => {
        setAutoCompleteResults()
        searchBarRef.current.value = ''
    }

    const onFavoriteLocation = (cityObject) => {
        const miniCity = {
            id: cityObject.id,
            cityName: cityObject.cityName
        }
        dispatch(addToFavorites(miniCity))
        toastService.addedMsg()
    }

    const onRemoveFavorite = (cityId) => {
        dispatch(removeFromFavorites(cityId))
        toastService.removedMsg()
    }

    if (isLoading) return <div className="loading"><img src="/gifs/spinner-loading.gif" /></div>
    return (
        <div className="home-page">
            <SearchBar
                ref={searchBarRef}
                handleChange={handleChange}
                onSelectLocation={onSelectLocation}
                autoCompleteResults={autoCompleteResults}
                onClearSearchBar={onClearSearchBar}
            />
            {currentWeather && <WeatherDetails
                weather={currentWeather}
                onFavoriteLocation={onFavoriteLocation}
                onRemoveFavorite={onRemoveFavorite}
                favoritesIds={favoritesIds}
            />}
        </div>
    )
}