import { useEffect, useState } from "react";
import meteoService from "../services/meteo";

const Country = ({ data }) => {
  const [meteo, setMeteo] = useState(undefined);

  if (data === undefined) return;

  useEffect(() => {
    meteoService.getMeteo(data.capital).then((m) => {
      setMeteo(m);
    });
  }, [data.capital]);

  return (
    <div>
      <h1>{data.name.official}</h1>
      <div>Capital {data.capital}</div>
      <div>Area {data.area}</div>
      <h1>Languages</h1>
      <ul>
        {Object.entries(data.languages).map(([code, lang]) => (
          <li key={code}>{lang}</li>
        ))}
      </ul>
      <img src={data.flags.svg} />
      {meteo === undefined ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Weather in {data.capital}</h1>
          <div>Temperature {meteo.main.temp} Celsius</div>
          <img
            src={`https://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`}
          />
          <div>Wind {meteo.wind.speed} m/s</div>
        </>
      )}
    </div>
  );
};

export default Country;
