import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const initialValueOfCity = {
    cityName: "Ankara",
    lat: "39.9208",
    lon: "32.854",
  };
  const [weatherInfo, setWeatherInfo] = useState();
  const [city, setCity] = useState(initialValueOfCity);
  const [isLoading, setIsLoading] = useState(true);
  const getIcon = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  };
  const API_KEY = "89c2b663012020e0908d9df736b2f6eb";
  const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&units=metric&lon=${city.lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}`;

  const getCityWeather = async () => {
    setIsLoading(true);
    await axios(API_URL)
      .then(({ data }) => {
        setWeatherInfo(data);
        
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCityWeather();
  }, [city]);

  const values = { city, setCity, weatherInfo, isLoading, getIcon };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
