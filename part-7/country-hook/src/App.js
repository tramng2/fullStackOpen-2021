import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };
  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name, isLoading) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    if(isLoading) {
      console.log(isLoading)
      axios
        .get(`https://restcountries.com/v2/name/${name}?fullText=true`)
        .then((response) => setCountry(response.data));
    } 
  }, [name, isLoading]);
  return country

};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }
  if (country.length === 0 || country.status === 404) {
    return <div>not found...</div>;
  }
  const [contryObject] = country
  return (
    <div>
      <h3>{contryObject.name} </h3>
      <div>capital {contryObject.capital} </div>
      <div>population {contryObject.population}</div>
      <img
        src={contryObject.flag}
        height="100"
        alt={`flag of ${contryObject.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const country= useCountry(name, isLoading);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
    setIsLoading(true)
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  );
};

export default App;
