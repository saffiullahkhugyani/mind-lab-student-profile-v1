import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Avatar, Typography } from "@mui/material";

const StudentProfile = () => {
  return (
    <Container className="border p-3 my-3">
      <Row className="mb-3">
        <Col>
          <Typography variant="h5" component="div" className="text-center">
            Student Profile
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col
          md={4}
          className="d-flex justify-content-center align-items-center border p-2"
        >
          <Avatar
            alt="Student Photo"
            src="https://via.placeholder.com/150"
            sx={{ width: 150, height: 150 }}
          />
        </Col>
        <Col md={8}>
          <Row className="border p-2">
            <Col className="d-flex justify-content-between">
              <Typography variant="body1">Number No</Typography>
              <Typography variant="body1">42341234</Typography>
            </Col>
          </Row>
          <Row className="border p-2">
            <Col className="d-flex justify-content-between">
              <Typography variant="body1">Date. Of. Birth</Typography>
              <Typography variant="body1">12-12-23</Typography>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="border p-2">
              <Typography variant="body2" className="fw-bold">
                Arabic
              </Typography>
              <Row className="d-flex justify-content-between border-top pt-2">
                <Col>First Name</Col>
                <Col className="text-end">أحمد</Col>
              </Row>
              <Row className="d-flex justify-content-between border-top pt-2">
                <Col>Last Name</Col>
                <Col className="text-end">كاجور</Col>
              </Row>
              <Row className="d-flex justify-content-between border-top pt-2">
                <Col>Full Name</Col>
                <Col className="text-end">أحمد محمد كاجور النعيمي</Col>
              </Row>
            </Col>
            <Col className="border p-2">
              <Typography variant="body2" className="fw-bold">
                English
              </Typography>
              <Row className="d-flex justify-content-between border-top pt-2">
                <Col>First Name</Col>
                <Col className="text-end">Ahmed</Col>
              </Row>
              <Row className="d-flex justify-content-between border-top pt-2">
                <Col>Last Name</Col>
                <Col className="text-end">Kajoor</Col>
              </Row>
              <Row className="d-flex justify-content-between border-top pt-2">
                <Col>Full Name</Col>
                <Col className="text-end">Ahmed mohd Ahmed Kajoor</Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-between border p-2">
          <Typography variant="body1">Date. Of. Birth</Typography>
          <Typography variant="body1">12-1-65</Typography>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-between border p-2">
          <Typography variant="body1">Email</Typography>
          <Typography variant="body1">kajoor77766@gmail.com</Typography>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-between border p-2">
          <Typography variant="body1">Contact</Typography>
          <Typography variant="body1">97155107766</Typography>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="border p-2">
          <Typography variant="body2" className="fw-bold">
            Address
          </Typography>
          <Row className="d-flex justify-content-between border-top pt-2">
            <Col>Neighborhood</Col>
            <Col className="text-end">Muuhasisha</Col>
          </Row>
          <Row className="d-flex justify-content-between border-top pt-2">
            <Col>Area</Col>
            <Col className="text-end">Diera</Col>
          </Row>
          <Row className="d-flex justify-content-between border-top pt-2">
            <Col>City</Col>
            <Col className="text-end">Dubai</Col>
          </Row>
          <Row className="d-flex justify-content-between border-top pt-2">
            <Col>Country</Col>
            <Col className="text-end">United Arab Emirates</Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="border p-2">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Certificate No</th>
                <th>Date</th>
                <th>Name Arabic</th>
                <th>Name English</th>
                <th>Pass</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1231412</td>
                <td>12-12-23</td>
                <td>نهاية الطباعة</td>
                <td>3d printing</td>
                <td>Completed</td>
                <td className="d-flex justify-content-center align-items-center">
                  <Button variant="outline-primary">Update</Button>
                </td>
              </tr>
              <tr>
                <td>44212</td>
                <td>11-1-23</td>
                <td>بايثون</td>
                <td>Pyathoo</td>
                <td>In progress</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentProfile;
