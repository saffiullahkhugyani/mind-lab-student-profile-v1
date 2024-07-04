import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Avatar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditCertificateModal from "../components/edit_certificate_modal";
import noUserImage from "../assets/no-profile-picture-icon.png";
import CustomPieChart from "../components/pie_chart";
import { supabase } from "../services/supabase_client";

// interfac for inserting student record into database
interface StudentRecord {
  id: string;
  arabic_first_name: string;
  arabic_last_name: string;
  english_first_name: string;
  english_last_name: string;
  father_name: string;
  date_of_birth: string;
  email: string;
  contact: string;
  country: string;
  state: string;
  city: string;
  street_address: string;
}

// Props for student interface
interface StudentProfileProps {
  student: StudentRecord;
}

// interface  for inserting data into certificate class
interface CertificateModel {
  issueAuthority: string;
  issueYear: string;
  numberOfHours: string;
  dateAdded: string;
  skillCategory: string;
  skill: string;
  skillLevel: string;
}

//interface for feteching existing certificates of students
interface CertificateFetchModel {
  id: string;
  date_added: string;
  skill: {
    arabic_skill_name: string;
    english_skill_name: string;
    skill_category: string;
  };
}

// empty templet to spread data of fetched certificates into state hook
const certificateFetchTemplet: CertificateFetchModel = {
  id: "",
  date_added: "",
  skill: {
    arabic_skill_name: "",
    english_skill_name: "",
    skill_category: "",
  },
};

// interface model for fetching existing skill list
interface SkillsList {
  id: string;
  arabic_skill_name: string;
  english_skill_name: string;
  skill_category: string;
}

// dummy data for pie charts
const data = [
  { id: 0, value: 10, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" },
];

const StudentProfile = ({ student }: StudentProfileProps) => {
  // state hooks to manage different states
  const [showModal, setShowModal] = useState(false);
  const [skillList, setSkillList] = useState<SkillsList[]>([]);
  const [certificateData, setCertificateData] = useState<CertificateModel[]>(
    []
  );
  const [certificateList, setCertificateList] = useState<
    CertificateFetchModel[]
  >([]);

  //  function for closeing a modal of add certificate
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // function for showing modal to add a certificate
  const handleShowModal = () => {
    setShowModal(true);
  };

  // this will be used for inserting certificates into database
  const handleSaveChanges = (data: any) => {
    setCertificateData((prevData) => [...prevData, data]);

    handleCloseModal();
  };

  // state hook to fetch available skill list
  useEffect(() => {
    const getSkillList = async () => {
      try {
        const { data, error } = await supabase.from("skill").select();

        if (error) {
          throw error;
        }

        setSkillList(data.map((skill) => ({ ...skill })));
        console.log(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log(String(err));
        }
      }
    };
    getSkillList();
  }, []);

  // state hook for debuging in development
  useEffect(() => {
    console.log("This is certificate Data: ", certificateData);
  }, [certificateData]);

  // state hook to fetch the available certificates of the use
  useEffect(() => {
    const getCertificates = async () => {
      try {
        const { data, error } = await supabase
          .from("certificate_master")
          .select(
            `id, date_added, skill(arabic_skill_name, english_skill_name, skill_category)`
          )
          .eq("student_id", student.id);

        if (error) {
          throw error;
        }
        setCertificateList(
          data.map((certificate: any) => ({
            ...certificateFetchTemplet,
            ...certificate,
          }))
        );

        console.log("This is Data: ", data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.error(String(err));
        }
      }
    };
    getCertificates();
  }, [student]);

  return (
    <Container className="border p-3 my-3">
      <Row className="mb-3 m-auto">
        <Col>
          <Typography variant="h5" component="div" className="text-center">
            Student Profile
          </Typography>
        </Col>
      </Row>
      <Row className="m-auto">
        <Col
          md={4}
          className="d-flex justify-content-center align-items-center border p-2"
        >
          <Avatar
            alt="Student Photo"
            src={noUserImage}
            sx={{ width: 150, height: 150 }}
          />
        </Col>
        <Col md={8}>
          <Row className="border p-2">
            <Col className="d-flex justify-content-between">
              <Typography variant="body1">Student ID</Typography>
              <Typography variant="body1">{student.id}</Typography>
            </Col>
          </Row>
          <Row className="border p-2">
            <Col className="d-flex justify-content-between">
              <Typography variant="body1">Date. Of. Birth</Typography>
              <Typography variant="body1">{student.date_of_birth}</Typography>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="border p-2">
              <Typography variant="body2" className="fw-bold">
                Arabic
              </Typography>
              <Row className="d-flex justify-content-between border-top pt-2">
                <Col>First Name</Col>
                <Col className="text-end">{student.arabic_first_name}</Col>
              </Row>
              <Row className="d-flex justify-content-between border-top pt-2">
                <Col>Last Name</Col>
                <Col className="text-end">{student.arabic_last_name}</Col>
              </Row>
              <Row className="d-flex justify-content-between border-top pt-2">
                <Col>Full Name</Col>
                <Col className="text-end">{`${student.arabic_first_name} ${student.arabic_last_name}`}</Col>
              </Row>
            </Col>
            <Col className="border p-2">
              <Typography variant="body2" className="fw-bold">
                English
              </Typography>
              <Row className="d-flex justify-content-between border-top pt-2">
                <Col>First Name</Col>
                <Col className="text-end">{student.english_first_name}</Col>
              </Row>
              <Row className="d-flex justify-content-between border-top pt-2">
                <Col>Last Name</Col>
                <Col className="text-end">{student.english_last_name}</Col>
              </Row>
              <Row className="d-flex justify-content-between border-top pt-2">
                <Col>Full Name</Col>
                <Col className="text-end">{`${student.english_first_name} ${student.english_last_name}`}</Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3 m-auto">
        <Col className="d-flex justify-content-between border p-2">
          <Typography variant="body1">Date. Of. Birth</Typography>
          <Typography variant="body1">12-1-65</Typography>
        </Col>
      </Row>
      <Row className="m-auto">
        <Col className="d-flex justify-content-between border p-2">
          <Typography variant="body1">Email</Typography>
          <Typography variant="body1">{student.email}</Typography>
        </Col>
      </Row>
      <Row className="m-auto">
        <Col className="d-flex justify-content-between border p-2">
          <Typography variant="body1">Contact</Typography>
          <Typography variant="body1">{student.contact}</Typography>
        </Col>
      </Row>
      <Row className="mt-3 m-auto">
        <Col className="border p-2">
          <Typography variant="body2" className="fw-bold">
            Address
          </Typography>
          <Row className="d-flex justify-content-between border-top pt-2">
            <Col>Street Address</Col>
            <Col className="text-end">{student.street_address}</Col>
          </Row>
          <Row className="d-flex justify-content-between border-top pt-2">
            <Col>City</Col>
            <Col className="text-end">{student.city}</Col>
          </Row>
          <Row className="d-flex justify-content-between border-top pt-2">
            <Col>State</Col>
            <Col className="text-end">{student.state}</Col>
          </Row>
          <Row className="d-flex justify-content-between border-top pt-2">
            <Col>Country</Col>
            <Col className="text-end">{student.country}</Col>
          </Row>
        </Col>
      </Row>
      <Row className="border mt-3 m-auto">
        <Col className="d-lg-flex justify-content-center">
          <CustomPieChart data={data} />
          <CustomPieChart data={data} />
        </Col>
      </Row>
      <Row className=" border mt-3 p-3 m-auto">
        <Col className="d-flex justify-content-center">
          <Button variant="outline-success" onClick={handleShowModal}>
            Add Certificate
          </Button>
        </Col>
      </Row>
      <Row className="mt-3 m-auto">
        <Col className="border p-2">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Certificate No</th>
                <th>Date</th>
                <th>Name Arabic</th>
                <th>Name English</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {certificateList.map((certificate) => (
                <tr key={certificate.id}>
                  <td>{certificate.id}</td>
                  <td>{certificate.date_added}</td>
                  <td>{certificate.skill.arabic_skill_name}</td>
                  <td>{certificate.skill.english_skill_name}</td>
                  <td>{certificate.skill.skill_category}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <EditCertificateModal
        show={showModal}
        onHide={handleCloseModal}
        onSave={handleSaveChanges}
        skillList={skillList}
      />
    </Container>
  );
};

export default StudentProfile;
