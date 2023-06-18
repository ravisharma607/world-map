import React, { useState, useEffect, useRef } from 'react'
import './Search.css'

const Search = (props) => {
  const { setselectedPosition, selectedCountry, setselectedCountry } = props;
  const [searchText, setSearchText] = useState("india");

  // API Data 
  const [ListPlace, setListPlace] = useState([])
  const delayRef = useRef(null);
  // Initialize the cachedDataRef object
  const cachedDataRef = useRef({});

  useEffect(() => {
    clearTimeout(delayRef.current);

    if (searchText || selectedCountry) {
      delayRef.current = setTimeout(fetchCountry, 300);
    }
  }, [searchText, selectedCountry]);

  const fetchCountry = () => {
    let countryName = searchText;
    let finalURL = `https://restcountries.com/v3.1/name/${selectedCountry.length > 0 ? selectedCountry : countryName}`;
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
          setSearchText(selectedCountry)
        }
        else {
          alert('Please Enter a valid country name')
        }
      })
      .catch((error) => {
        alert('Oops! Unable to fetch the country data.');
      });
  }
  // ----------------------------------------------
  let timeout;

  const handleInputChange = (e) => {
    clearTimeout(timeout);
    const value = e.target.value;
    setSearchText(value);
    timeout = setTimeout(() => {
      // Perform search or other actions here
    }, 500); // Adjust the delay as needed
  };

  const handleSearch = () => {
    setselectedCountry(searchText)
  };
  // ----------------------------------------------

  return (
    <>
      <div className="search-card animate__animated animate__fadeInDown">
          <div className="input">
            <input type="search" placeholder='Search Here...' value={searchText} onChange={handleInputChange} />
            <div className="action">
              <button className="btn" onClick={() => handleSearch()}>Search</button>
            </div>
        </div>
        <div className="search-result">
          <div className="country-image">
            <div className="flag">
              {ListPlace.flags && ListPlace.flags.svg && <img src={ListPlace.flags.svg} alt="" />}
              <span>National Flag</span>
            </div>
            <div className="coatOfArms">
              {ListPlace.coatOfArms && ListPlace.coatOfArms.svg && <img src={ListPlace.coatOfArms.png} alt="" />}
              <span>National Coat Of Arms</span>
            </div>
          </div>
          <hr />
          <ul>
            {ListPlace.name && (
              <li><span>Country Name: </span>{ListPlace.name.common}</li>
            )}
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