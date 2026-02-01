import { useEffect, useState } from "react";
import Country from "./comonents/Country";
import countriesService from "./services/countries";

const App = () => {
  const [search, setSearch] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  //const [response, setResponse] = useState("");

  useEffect(() => {
    countriesService
      .getAll()
      .then((initialCountries) => setAllCountries(initialCountries));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const countriesFound =
    search === ""
      ? []
      : allCountries.filter((country) =>
          country.name.official.toLowerCase().includes(search.toLowerCase()),
        );

  console.log(countriesFound);

  const getResponse = () => {
    console.log("getting res", countriesFound.length);
    if (countriesFound.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (countriesFound.length > 1) {
      return (
        <div>
          {countriesFound.map((country) => (
            <div key={country.name.official}>{country.name.official}</div>
          ))}
        </div>
      );
    } else {
      return (
        <Country
          data={countriesFound.length > 0 ? countriesFound[0] : undefined}
        />
      );
    }
  };

  return (
    <div>
      <form>
        <div>
          Find countries
          <input value={search} onChange={handleSearchChange}></input>
        </div>
      </form>
      {getResponse()}
    </div>
  );
};

export default App;
