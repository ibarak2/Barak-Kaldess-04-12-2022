import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FavoritesPreviews } from "../cmps/favorites-previews"
import { toastService } from "../services/toast-service"
import { weatherService } from "../services/weather-service"
import { setCurrentWeather, setLoadingFalse, setLoadingTrue } from "../store/weather/weather.actions"

export const FavoritesPage = () => {

    const { favoritesIds, isLoading } = useSelector(state => state.weatherModule)
    const [myFavorites, setMyFavorites] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        onLoadFavorites()
    }, [])

    const onLoadFavorites = async () => {
        try {
            dispatch(setLoadingTrue())
            const favs = await weatherService.getFavoritesForecasts(favoritesIds)
            setMyFavorites(favs)
            dispatch(setLoadingFalse())
        } catch (err) {
            toastService.showErrorMsg()
        }
    }

    const onSelectFavorite = (cityObject) => {
        const miniCity = {
            id: cityObject.id,
            cityName: cityObject.cityName
        }
        dispatch(setCurrentWeather(miniCity))
        navigate('/home')
    }

    if (isLoading) return <div className="loading"><img src="/gifs/spinner-loading.gif" /></div>
    return (
        <div className="favorites-page">
            <h2 className="title">My Favorite Locations</h2>
            {myFavorites ?
                <FavoritesPreviews
                    myFavorites={myFavorites}
                    onSelectFavorite={onSelectFavorite}
                />
                :
                <div className="no-favorites">
                    <p>No locations added yet.</p>
                </div>
            }
        </div>
    )
}