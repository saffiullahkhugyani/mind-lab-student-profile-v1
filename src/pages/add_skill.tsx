import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BackDrop from "../components/back_drop";

interface SkillData {
  skillCategory: string;
  arabicSkillName: string;
  englishSkillName: string;
}

const AddSkill = () => {
  const [validated, setValidated] = useState(false);
  const [skillCategory, setSkillCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillData, setSkillData] = useState<SkillData>({
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
    setIsSubmitting(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setIsSubmitting(false);
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setTimeout(() => {
        console.log({
          ...skillData,
          skillCategory: skillCategory,
        });
        setIsSubmitting(false);
      }, 1000);
    }
    console.log("outside else body");

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
        <h3 className="mb-3 text-center">Add Skill</h3>
        <Form.Group className="mb-3" controlId="skillCategory">
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
            <option value="Soft skill">Soft skill</option>
            <option value="Hard skill">Hard skill</option>
            <option value="Programing">Programing</option>
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
            onBlur={handleArabicBlur}
            onFocus={handleArabicFocus}
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
      <BackDrop
        toggle={isSubmitting}
        handleClose={() => {
          console.log("Handle function to close back drop");
        }}
      />
    </div>
  );
};

export default AddSkill;
