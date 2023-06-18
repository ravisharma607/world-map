import React, { useState,useEffect,useRef } from 'react'
import './Search.css'

const Search = (props) => {
  const {setselectedPosition, selectedCountry} = props;
  const [searchText, setsearchText] = useState("")
  const [ListPlace, setListPlace] = useState([])

  const delayRef = useRef(null);
  
  useEffect(() => {
    clearTimeout(delayRef.current);
  
    if (searchText || selectedCountry) {
      delayRef.current = setTimeout(fetchCountry, 300);
    }
  }, [searchText, selectedCountry]);
  
  useEffect(() => {
    clearTimeout(delayRef.current);

    if (searchText || selectedCountry) {
      delayRef.current = setTimeout(fetchCountry, 300);
    }
  }, [searchText, selectedCountry]);

  function fetchCountry() {
    let countryName = searchText;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName?countryName:selectedCountry}?fullText=true  `
  
// --------------------------------------------------------------
  // Checking if data for the same request is already cached or not
  if (cachedDataRef.current[finalURL]) {
    const cachedData = cachedDataRef.current[finalURL];
    setListPlace(cachedData);
    setselectedPosition(cachedData.name.common);
    return; // Skip API call
  }
// --------------------------------------------------------------

fetch(finalURL)
.then((response) => response.json())
.then((data) => {
  if (Array.isArray(data) && data.length > 0) {
    const fetchedData = data[0];
    cachedDataRef.current[finalURL] = fetchedData; // Storing data in cache
    setListPlace(fetchedData);
    setselectedPosition(fetchedData.name.common);
  }
  else{
    alert('Please Enter a valid country name')
  }
})
.catch((error) => {
  alert('Oops! Unable to fetch the country data.');
});
}
// Initialize the cachedDataRef object
const cachedDataRef = useRef({});

  return (
    <>
      <div className="search-card">
        <div className="search-box">
          <div className="input">
            <input type="search" name="" id="" placeholder='Search Here...' value={searchText} onChange={(e) => {
              setsearchText(e.target.value);
            }} />
          <div className="action">
            <button className="btn" onClick={fetchCountry}>Search</button>
          </div>
          </div>
        </div>
        <div className="search-result">
          <div className="country-image">
            {ListPlace.flags && ListPlace.flags.svg && <img src={ListPlace.flags.svg} alt="" />}
          </div>
          <ul>
            {ListPlace.capital && ListPlace.capital && <li><span>Capital:</span>{ListPlace.capital}</li>}
            {ListPlace.continents && ListPlace.continents && <li><span>continents</span>{ListPlace.continents}</li>}
            {ListPlace.currencies && ListPlace.currencies.INR && (
              <li>
                <span>Currencies:</span> {ListPlace.currencies.INR.name} ({ListPlace.currencies.INR.symbol})
              </li>
            )}

            {ListPlace.timezones && ListPlace.timezones && <li><span>timezones:</span>{ListPlace.timezones}</li>}
            {ListPlace.area && ListPlace.area && <li><span>Area:</span>{ListPlace.area}</li>}
            {ListPlace.latlng && (
              <li><span>latlng: </span>{ListPlace.latlng[0]},{ListPlace.latlng[1]}</li>
            )}

            {ListPlace.languages && (
              <div className='flex'>
                <span>Languages:</span>
                  {Object.values(ListPlace.languages).map((language, index) => (
                    <li key={index}>{` ${language}, `}</li>
                  ))}
                  </div>
            )}
            {ListPlace.name && (
              <li><span>Country Name: </span>{ListPlace.name.common}</li>
            )}
            {ListPlace.borders && (
              <li><span>Country Borders: </span>{` ${ListPlace.borders} `} </li>
            )}


          </ul>
        </div>
      </div>
    </>
  )
}

export default Search