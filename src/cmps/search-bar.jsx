import React from "react"

export const SearchBar = React.forwardRef(({ handleChange, autoCompleteResults, onSelectLocation, onClearSearchBar }, ref) => (
    <div className="search-bar">
        <input
            ref={ref}
            placeholder="Search a city..."
            type="text"
            id="search"
            name="search"
            autoComplete="off"
            onChange={(ev) => handleChange(ev)}
        />
        <button className="clear-btn" onClick={onClearSearchBar}>X</button>
        {autoCompleteResults && <div className="autocomplete">
            {autoCompleteResults.map((element) => {
                return (
                    <p
                        key={element.id}
                        className="item"
                        onClick={() => onSelectLocation(element.id, element.cityName)}
                    >{element.cityName}, {element.countryName}</p>
                )
            })}
        </div>}
    </div>
))
