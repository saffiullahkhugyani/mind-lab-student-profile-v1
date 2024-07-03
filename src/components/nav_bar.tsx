import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

import logo from "../assets/mind_lab_app_icon.png";
import AddStudent from "../pages/add_student";
import AddSkill from "../pages/add_skill";
import HomePage from "../pages/home_page";

function NavBar() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<NavLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/add-skill" element={<AddSkill />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default NavBar;

function NavLayout() {
  return (
    <div>
      <Navbar bg={"dark"} variant={"dark"} expand="lg">
        <Container fluid>
          <img src={logo} width={30} height={30} className="me-3" />
          <Navbar.Brand as={Link} to={"/"}>
            Go Mind Lab
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/add-student"}>
                Add Student
              </Nav.Link>

              <Nav.Link as={Link} to={"/add-skill"}>
                Add Skill
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}
