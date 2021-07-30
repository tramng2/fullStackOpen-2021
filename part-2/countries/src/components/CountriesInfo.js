import React, { useState, useEffect } from "react";
import axios from "axios";

function CountriesInfo({country}) {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState('')
    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then((response) => setWeather(response.data.current));
      }, [api_key, country])
    return (
        <div>
            <h2>{country.name}</h2>
            <p>{country.capital}</p>
            <p>{country.population}</p>
            <h2>Languages</h2>
            <ul>
            {country.languages.map((el,index) => <li key={index}>{el.name}</li>)}
            </ul>
            <img src={country.flag} alt="flag" width="100" height="50"/>
            <h2>Weather in {country.capital}</h2>
            <p><b>temperature:</b> {weather.temperature} Celsius</p>
            <img src={weather.weather_icons} alt="weather" width="100"/>
            <p><b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>  
    )
}

export default CountriesInfo
