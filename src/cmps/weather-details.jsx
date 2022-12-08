import { utilService } from "../services/util.service"

export const WeatherDetails = ({ weather, onFavoriteLocation, onRemoveFavorite, favoritesIds }) => {

    const isFavorited = () => {
        return favoritesIds.find(element => element.id === weather.id)
    }

    return (
        <div className="weather-details">
            <div className="weather-today">
                <div className="content">
                    <h4>{weather.cityName}</h4>
                    <h4>{weather.forecasts[0].cTemperature}° C</h4>
                </div>
                {isFavorited() ?
                    <button onClick={() => onRemoveFavorite(weather.id)} className="remove-favorite-btn">Remove from Favorites</button>
                    :
                    <button onClick={() => onFavoriteLocation(weather)} className="favorite-btn">Add to Favorites</button>
                }
            </div>
            <h2 className="weather-description">{weather.forecasts[0].description}</h2>
            <div className="weather-forecasts">
                {weather.forecasts.map((element, idx) => {
                    return <div key={idx} className="forecast-item">
                        <h5>{utilService.getDay(element.time)}</h5>
                        <h5>{element.cTemperature}° C</h5>
                    </div>

                })}
            </div>

        </div>
    )
}