import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

interface Country {
  name: string;
}

interface State {
  name: string;
}

const AddStudent = () => {
  const [validated, setValidated] = useState(false);
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

  // handle for country change
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value;
    setSelectedCountry(country);
    console.log(country);

    // Fetch states for the selected Countries
    axios
      .post("https://countriesnow.space/api/v0.1/countries/states", { country })
      .then((respose) => {
        setStates(respose.data.data.states);
        console.log(respose.data.data);
      })
      .catch((error) => console.error("Error Fetching State", error));
  };

  // handle for state change
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value;
    setSelectedState(state);
    console.log(state);

    // fetch cities for selected state
    axios
      .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
        country: selectedCountry,
        state,
      })
      .then((response) => {
        setCities(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => console.error(error));
  };

  const handelCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleArabicFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.setAttribute("dir", "rtl");
    event.target.setAttribute("lang", "ar");
  };

  const handleArabicBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.removeAttribute("dir");
    event.target.removeAttribute("lang");
  };

  return (
    <div className="m-auto w-75 p-3">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h3 className="mb-3 text-center">Add Student</h3>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formArabicFirstName">
              <Form.Label>First Name (Arabic)</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter First Name"
                onFocus={handleArabicFocus}
                onBlur={handleArabicBlur}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Arabic first name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formArabicLastName">
              <Form.Label>Last Name (Arabic)</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Arabic Last Name"
                onFocus={handleArabicFocus}
                onBlur={handleArabicBlur}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Arabic last name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name (English)</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter First Name"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid first name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name (English)</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Last Name"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid last name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control required type="date" />
              <Form.Control.Feedback>Looks good</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid date of birth.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formNumber">
              <Form.Label>Father Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Father Name"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid number.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Enter Email" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formContact">
          <Form.Label>Contact</Form.Label>
          <Form.Control required type="number" placeholder="Enter Contact" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid contact.
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Select
                required
                as={"select"}
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                <option>Select a Country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide a valid country.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>State</Form.Label>
              <Form.Select
                required
                as={"select"}
                aria-label="Default Select"
                value={selectedState}
                onChange={handleStateChange}
              >
                <option>Select a State</option>
                {states.map((state) => (
                  <option key={state.name} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide a valid State.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formNeighborhood">
              <Form.Label>City</Form.Label>
              <Form.Select
                required
                aria-label="Default value"
                value={selectedCity}
                onChange={handelCityChange}
              >
                <option>Select a city</option>
                {cities &&
                  cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide a valid neighborhood.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formArea">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Street Address"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid area.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formPhoto">
          <Form.Label>Photo</Form.Label>
          <Form.Control required type="file" />
          <Form.Control.Feedback type="invalid">
            Please upload a photo.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddStudent;
