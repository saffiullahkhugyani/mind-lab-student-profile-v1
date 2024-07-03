import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddSkill = () => {
  const [validated, setValidated] = useState(false);
  const [skillCategory, setSkillCategory] = useState("");
  const [skillData, setSkillData] = useState({
    skillCategory: "",
    arabicSkillName: "",
    englishSkillName: "",
  });

  // for handling input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target as HTMLInputElement;
    setSkillData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // for handling select change
  const handleSkillCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const skillCategory = event.target.value;
    setSkillCategory(skillCategory);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      console.log({
        ...skillData,
        skillCategory: skillCategory,
      });
    }

    setValidated(true);
  };

  return (
    <div className="m-auto w-75 p-3">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h3 className="mb-3 text-center">Add Skill</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Skill Category</Form.Label>
          <Form.Select
            required
            as="select"
            defaultValue=""
            onChange={handleSkillCategoryChange}
          >
            <option value="" disabled>
              Please select an option
            </option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
            <option value="Option 4">Option 4</option>
            <option value="Option 5">Option 5</option>
            <option value="Option 6">Option 6</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a skill category
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="arabicSkillName">
          <Form.Label>Skill Name (Arabic)</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Skill name "
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter skill name (Arabic)
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="englishSkillName">
          <Form.Label>Skill Name (English)</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Skill name"
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter skill name (English)
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-center ">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddSkill;
