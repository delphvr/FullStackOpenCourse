import { useEffect, useState } from "react";
import Country from "./comonents/Country";
import countriesService from "./services/countries";

const App = () => {
  const [search, setSearch] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    countriesService
      .getAll()
      .then((initialCountries) => setAllCountries(initialCountries));
  }, []);

  const handleSearchChange = (event) => {
    const newSearchValue = event.target.value;
    setSearch(newSearchValue);
    setCountriesToShow(
      newSearchValue === ""
        ? []
        : allCountries.filter((country) =>
            country.name.official
              .toLowerCase()
              .includes(newSearchValue.toLowerCase()),
          ),
    );
  };

  const showContry = (country) => {
    setCountriesToShow([country]);
  };

  const getResponse = () => {
    if (countriesToShow.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (countriesToShow.length > 1) {
      return (
        <div>
          {countriesToShow.map((country) => (
            <div key={country.name.official}>
              {country.name.official}{" "}
              <button onClick={() => showContry(country)}>Show</button>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <Country
          data={countriesToShow.length > 0 ? countriesToShow[0] : undefined}
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
