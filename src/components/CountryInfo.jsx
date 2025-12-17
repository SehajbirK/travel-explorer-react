import { useEffect, useState } from "react";

export default function CountryInfo({ countryName }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const data = await res.json();
      setInfo(data[0]);
    };
    fetchCountry();
  }, [countryName]);

  if (!info) return <p>Loading country info...</p>;

  return (
    <div className="p-4 bg-green-100 rounded">
      <h4 className="font-semibold">{info.name.common}</h4>
      <p>Region: {info.region}</p>
      <p>Population: {info.population.toLocaleString()}</p>
      <p>Currency: {Object.keys(info.currencies)[0]}</p>
      <p>Language: {Object.values(info.languages)[0]}</p>
    </div>
  );
}
