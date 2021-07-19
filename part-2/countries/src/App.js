import React, { useState, useEffect } from "react";
import axios from "axios";
import CountriesInfo from "./components/CountriesInfo.js";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [findResult, setFindResult] = useState([]);

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
  const countrySearchRender = () => {
    if (findResult.length > 10)
      return <p>Too many matches, secify another filter</p>;
    else if (findResult.length === 1)
      return (
        <ul>
          {findResult.map((el, index) => (
            <CountriesInfo key={index} country={el} />
          ))}
        </ul>
      );
    else
      return (
        <ul>
          {findResult.map((el, index) => (
            <p>{el.name}</p>
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
