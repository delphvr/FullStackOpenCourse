const Country = ({ data }) => {
  if (data === undefined) return;
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
    </div>
  );
};

export default Country;
