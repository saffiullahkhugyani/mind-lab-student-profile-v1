import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import useLocationData from "../hooks/useLocationData";
import { supabase } from "../services/supabase_client";
import BackDrop from "../components/back_drop";

interface StudentRecord {
  arabicFirstName: string;
  arabicLastName: string;
  englishFirstName: string;
  englishLastName: string;
  dateOfBirth: string;
  fatherName: string;
  email: string;
  contact: "";
  streetAddress: string;
  country: string;
  state: string;
  city: string;
}

const AddStudent = () => {
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    countries,
    states,
    fetchStates,
    cities,
    fetchCities,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
  } = useLocationData();
  const [formData, setFormData] = useState<StudentRecord>({
    arabicFirstName: "",
    arabicLastName: "",
    englishFirstName: "",
    englishLastName: "",
    dateOfBirth: "",
    fatherName: "",
    email: "",
    contact: "",
    streetAddress: "",
    country: "",
    state: "",
    city: "",
  });

  // handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // handle for country change
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value;
    setSelectedCountry(country);
    fetchStates(country);
  };

  // handle for state change
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value;
    setSelectedState(state);
    fetchCities(selectedCountry, state);
  };

  const handelCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setIsSubmitting(false);
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setFormData({
        ...formData,
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
      });
      setTimeout(() => {
        setIsSubmitting(false);
        console.log(formData);
      }, 1000);
      // console.log({
      //   ...formData,
      //   country: selectedCountry,
      //   state: selectedState,
      //   city: selectedCity,
      // });
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

  // useEffect(() => {
  //   insertStudentRecord(formData);
  // }, [handleSubmit]);

  // const insertStudentRecord = async (studentData: StudentRecord) => {
  //   console.log(studentData);
  //   const { data, error } = await supabase
  //     .from("student_record")
  //     .insert({
  //       arabic_first_name: studentData.arabicFirstName,
  //       arabic_last_name: studentData.arabicLastName,
  //       english_first_name: studentData.englishFirstName,
  //       english_last_name: studentData.englishLastName,
  //       father_name: studentData.fatherName,
  //       date_ofbirth: studentData.dateOfBirth,
  //       email: studentData.email,
  //       contact: studentData.contact,
  //       country: studentData.country,
  //       state: studentData.state,
  //       city: studentData.city,
  //       street_address: studentData.streetAddress,
  //     })
  //     .select();

  //   if (error) {
  //     console.log("Error inserting data", error);
  //   }
  //   console.log(data);
  // };

  return (
    <div className="m-auto w-75 p-3">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h3 className="mb-3 text-center">Add Student</h3>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="arabicFirstName">
              <Form.Label>First Name (Arabic)</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter First Name"
                onChange={handleInputChange}
                onFocus={handleArabicFocus}
                onBlur={handleArabicBlur}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Arabic first name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="arabicLastName">
              <Form.Label>Last Name (Arabic)</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Arabic Last Name"
                onChange={handleInputChange}
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
            <Form.Group className="mb-3" controlId="englishFirstName">
              <Form.Label>First Name (English)</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter First Name"
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid first name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="englishLastName">
              <Form.Label>Last Name (English)</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Last Name"
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid last name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control required type="date" onChange={handleInputChange} />
              <Form.Control.Feedback>Looks good</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid date of birth.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="fatherName">
              <Form.Label>Father Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Father Name"
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid number.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="contact">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter Contact"
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid contact.
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Select
                required
                as={"select"}
                onChange={handleCountryChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a Country
                </option>
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
            <Form.Group className="mb-3" controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Select
                required
                as={"select"}
                aria-label="Default Select"
                onChange={handleStateChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a State
                </option>
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
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Select
                required
                aria-label="Default value"
                onChange={handelCityChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a city
                </option>
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
            <Form.Group className="mb-3" controlId="streetAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Street Address"
                onChange={handleInputChange}
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
      <BackDrop toggle={isSubmitting} handleClose={() => {}} />
    </div>
  );
};

export default AddStudent;
