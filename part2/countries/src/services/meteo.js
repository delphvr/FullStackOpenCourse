import axios from "axios";
const api_key = import.meta.env.VITE_METEO_KEY;

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getMeteo = (city) => {
  const request = axios.get(
    `${baseUrl}?q=${city}&APPID=${api_key}&units=metric`,
  );
  return request.then((response) => response.data);
};

export default { getMeteo };
