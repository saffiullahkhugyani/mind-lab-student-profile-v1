import { useState, useEffect } from "react";
import axios from "axios";

interface Country {
  name: string;
}

interface State {
  name: string;
}

const useLocationData = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    // Fetch countries
    axios
      .get("https://countriesnow.space/api/v0.1/countries/positions")
      .then((response) => {
        setCountries(response.data.data);
      });
  }, []);

  const fetchStates = (country: string) => {
    setSelectedCountry(country);
    axios
      .post("https://countriesnow.space/api/v0.1/countries/states", { country })
      .then((response) => {
        setStates(response.data.data.states);
      })
      .catch((error) => console.error("Error Fetching State", error));
  };

  const fetchCities = (country: string, state: string) => {
    setSelectedState(state);
    axios
      .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
        country,
        state,
      })
      .then((response) => {
        setCities(response.data.data);
      })
      .catch((error) => console.error("Error Fetching Cities", error));
  };

  return {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    selectedCity,
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    fetchStates,
    fetchCities,
  };
};

export default useLocationData;
