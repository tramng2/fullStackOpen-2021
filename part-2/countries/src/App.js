import React, { useState, useEffect } from "react";
import axios from "axios";
import CountriesInfo from "./components/CountriesInfo.js";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [findResult, setFindResult] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState('')

  useEffect(() => {
    if(findResult.length === 1) {
      axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${findResult[0].capital}`)
      .then((response) => setWeather(response.data.current));
    }
    }, [api_key, findResult, findResult.length])

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilter = (event) => {
    const filter = countries.filter((country) =>
      country.name.toLowerCase().includes(event.target.value)
    );
    setFindResult(filter);
  };
  const handleClick = (country) => {
    setFindResult([country]);
  };

  const countrySearchRender = () => {
    if (findResult.length > 10)
      return <p>Too many matches, secify another filter</p>;
    else if (findResult.length === 1) {
      const [country] = findResult;
      return <CountriesInfo country={country} weather={weather}/>;
    } else
      return (
        <ul>
          {findResult.map((el, index) => (
            <div>
              <span>{el.name}</span>
              <button onClick={() => handleClick(el)}>show</button>
            </div>
          ))}
        </ul>
      );
  };

  return (
    <div>
      <span>find countries</span>
      <input onChange={handleFilter} name="name" />
      {countrySearchRender()}
    </div>
  );
};

export default App;
