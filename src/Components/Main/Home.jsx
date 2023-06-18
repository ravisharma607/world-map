import React, { useState } from 'react'
import WorldMap from '../Map/WorldMap'
import Search from '../Search/Search'
import './Home.css'
const Home = () => {
    const [selectedPosition, setselectedPosition] = useState('india')
    const [selectedCountry, setselectedCountry] = useState('india')
    return (
        <>
            <div className="container">
                <div className="map">
                    <WorldMap selectedPosition={selectedPosition} selectedCountry={selectedCountry} setselectedCountry={setselectedCountry} />
                </div>
                <div className='search'>
                    <Search selectedPosition={selectedPosition} setselectedPosition={setselectedPosition} selectedCountry={selectedCountry} setselectedCountry={setselectedCountry} />
                </div>
            </div>
        </>
    )
}

export default Home