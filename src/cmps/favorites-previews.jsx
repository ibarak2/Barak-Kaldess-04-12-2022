export const FavoritesPreviews = ({ myFavorites, onSelectFavorite }) => {

    return (
        <div className="favorites-container">
            <div className="favorites-previews">
                {myFavorites.map(element => {
                    return (
                        <div onClick={() => onSelectFavorite(element)} key={element.id} className="favorite-item">
                            <div className="favorite-content">
                                <h3>{element.cityName}</h3>
                                <h3>{element.cTemperature}° C</h3>
                            </div>
                            <h3>{element.description}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}