import { Form, Modal, Button } from "react-bootstrap";
import React, { useRef, useState } from "react";

interface SKillsProp {
  id: string;
  arabic_skill_name: string;
  english_skill_name: string;
  skill_category: string;
}

interface CertificateProps {
  dateAdded: string;
  issueAuthority: string;
  issueYear: string;
  numberOfHours: string;
  skill: string;
  skillCategory: string;
  skillLevel: string;
}

interface EditCertificateModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (data: CertificateProps) => void;
  skillList: SKillsProp[];
}

const EditCertificateModal = ({
  show,
  onHide,
  onSave,
  skillList,
}: EditCertificateModalProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        // const data = Object.fromEntries(formData.entries());
        const data: CertificateProps = {
          dateAdded: formData.get("dateAdded") as string,
          issueAuthority: formData.get("issueAuthority") as string,
          issueYear: formData.get("issueYear") as string,
          numberOfHours: formData.get("numberOfHours") as string,
          skill: formData.get("skill") as string,
          skillCategory: formData.get("skillCategory") as string,
          skillLevel: formData.get("skillLevel") as string,
        };
        onSave(data);
        setValidated(false);
      }
    }

    setValidated(true);
  };

  const handleClose = () => {
    setValidated(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Certificate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="issueAuthority">
            <Form.Label>Issue Authority</Form.Label>
            <Form.Control required type={"text"} name="issueAuthority" />
            <Form.Control.Feedback type="invalid">
              Please provide issue authority
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="issueYear">
            <Form.Label>Issue Year</Form.Label>
            <Form.Control required type={"number"} name="issueYear" />
            <Form.Control.Feedback type="invalid">
              Please provide issue year
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="numberOfHours">
            <Form.Label>Number of Hours</Form.Label>
            <Form.Control required type="number" name="numberOfHours" />
            <Form.Control.Feedback type="invalid">
              Please provide Number of hours
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="dateAdded">
            <Form.Label>Date Added</Form.Label>
            <Form.Control required name="dateAdded" type="date" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="skillCategory">
            <Form.Label>Skill Category</Form.Label>
            <Form.Select required name="skillCategory" defaultValue="">
              <option value="" disabled>
                Please select an option
              </option>
              <option value="Soft Skill">Soft Skill</option>
              <option value="Hard Skill">Hard Skill</option>
              <option value="Programing">Programing</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a valid Skill Category.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="skill">
            <Form.Label>Skill</Form.Label>
            <Form.Select required name="skill" defaultValue="">
              <option value="" disabled>
                Please select an option
              </option>
              <option value="Option 1">Option 1</option>
              {skillList &&
                skillList.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.english_skill_name}
                  </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a valid skill.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="skillLevel">
            <Form.Label>Skill Level</Form.Label>
            <Form.Select required name="skillLevel" defaultValue="">
              <option value="" disabled>
                Please select an option
              </option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advance">Advance</option>
              <option value="Expert">Expert</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a valid skill level.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => formRef.current?.requestSubmit()}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCertificateModal;
