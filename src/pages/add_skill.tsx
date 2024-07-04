import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BackDrop from "../components/back_drop";
import CustomizedSnackbars from "../components/snack_bar";
import { supabase } from "../services/supabase_client";

interface SkillData {
  skillCategory: string;
  arabicSkillName: string;
  englishSkillName: string;
}

const AddSkill = () => {
  const [validated, setValidated] = useState(false);
  const [skillCategory, setSkillCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const [skillData, setSkillData] = useState<SkillData>({
    skillCategory: "",
    arabicSkillName: "",
    englishSkillName: "",
  });

  // reference for the form
  const formRef = useRef<HTMLFormElement>(null);

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
      setOnSubmit(true);
      event.preventDefault();
      setSkillData({ ...skillData, skillCategory: skillCategory });
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

  useEffect(() => {
    if (onSubmit) {
      insertSkill(skillData);
    }
  }, [onSubmit]);

  const insertSkill = async (skillData: SkillData) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("skill")
        .insert({
          skill_category: skillData.skillCategory,
          arabic_skill_name: skillData.arabicSkillName,
          english_skill_name: skillData.englishSkillName,
        })
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        if (formRef.current) {
          formRef.current.reset();
        }
        setValidated(false);
        setShowSnackbar(true);
        console.log(data);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(String(err));
      }
    } finally {
      setOnSubmit(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="m-auto w-75 p-3">
      <Form
        ref={formRef}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
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
          <Button variant="outline-primary" type="submit">
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
      <CustomizedSnackbars
        show={showSnackbar}
        onClose={() => {
          setShowSnackbar(false);
        }}
        message="Skill added Successfully!"
      />
    </div>
  );
};

export default AddSkill;
