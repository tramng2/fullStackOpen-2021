import React from 'react'

function CountriesInfo({country}) {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>{country.capital}</p>
            <p>{country.population}</p>
            <h1>Languages</h1>
            <ul>
            {country.languages.map((el,index) => <li key={index}>{el.name}</li>)}
            </ul>
            <img src={country.flag} alt="flag" width="100" height="50"/>
        </div>
    )
}

export default CountriesInfo
