import React,{useState,useEffect} from "react";
import moment from "moment";
import { useWeather } from "../context/WeatherContext";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardHeader,
  CardTitle,
  CardText,
  CardGroup,
  CardImg,
  Input
} from "reactstrap";

import cities from "../cities.json";

function WeatherList() {
  const { city, setCity, weatherInfo, isLoading, getIcon } = useWeather();
  const { daily, current } = { ...weatherInfo };
  const [cityName,setCityName]=useState();

  const changeCity = (e) => {
    
    const _city=cities.find((item) => {
        return (item.name === e.target.value);
      })    
    setCity({ cityName: _city.name, lat: _city.latitude, lon: _city.longitude });
  };



  const selectOptions = cities.map((item) =>(
    <option value={item.name} key={item.name}  >
      {item.name}
    </option>
  ))
  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <Input name="inputCity" type="select" onChange={changeCity}>
             {selectOptions}
            </Input>
          </CardHeader>
          <CardBody>
            {!isLoading && (
              <CardGroup className="m-1">
                {daily.map((item, index) => (
                  <Card
                    key={item.dt}
                    className={
                      index === 0 ? "text-center bg-light" : "text-center"
                    }
                  >
                    <CardBody>
                      <CardTitle tag="h5">
                        {moment(item.dt * 1000).format("ddd")}
                      </CardTitle>
                      <CardImg
                        alt="Card image cap"
                        src={getIcon(item.weather[0].icon)}
                        top
                        width="100%"
                      />
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        <p className="h5">{item.weather[0].main}</p>
                        <p className="h4">
                          {Math.round(item.temp.min)}°C /{" "}
                          {Math.round(item.temp.max)}°C{" "}
                        </p>
                      </CardSubtitle>
                      <CardText></CardText>
                    </CardBody>
                  </Card>
                ))}
              </CardGroup>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default WeatherList;
