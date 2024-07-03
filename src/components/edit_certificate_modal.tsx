import { Form, Modal, Button } from "react-bootstrap";
import React, { useRef, useState } from "react";

interface EditCertificateModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (data: any) => void;
}

const EditCertificateModal = ({
  show,
  onHide,
  onSave,
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
        const data = Object.fromEntries(formData.entries());
        onSave(data);
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
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
              <option value="Option 4">Option 4</option>
              <option value="Option 5">Option 5</option>
              <option value="Option 6">Option 6</option>
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
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
              <option value="Option 4">Option 4</option>
              <option value="Option 5">Option 5</option>
              <option value="Option 6">Option 6</option>
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
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
              <option value="Option 4">Option 4</option>
              <option value="Option 5">Option 5</option>
              <option value="Option 6">Option 6</option>
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
