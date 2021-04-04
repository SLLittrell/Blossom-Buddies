import React, { createContext, useState } from "react"
import { settings } from "../Settings"

//getting the users location for weather
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
//   36.1453637 -86.8320645

  function success(pos) {
    var crd = pos.coords;
    lat = crd.latitude
    long = crd.longitude
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);


let lat= ""
let long = ""
export const WeatherContext = createContext()

export const WeatherProvider = (props) => {
    const [weather, setWeather] = useState([])

    const getWeather = () => {
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely,hourly,alerts&appid=${settings.weatherKey}`)
            .then(response => response.json())
            .then(
                parsedWeather => {
               setWeather(parsedWeather)
            })
    
    }

    
    return (
        <WeatherContext.Provider value={{
            weather, getWeather  
        }}>
            {props.children}
        </WeatherContext.Provider>
    )

}