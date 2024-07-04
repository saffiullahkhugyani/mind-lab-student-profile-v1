import { Form } from "react-bootstrap";
import StudentProfile from "./student_profile";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase_client";
import BackDrop from "../components/back_drop";

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

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord>();
  const [studentRecord, setStudentRecord] = useState<StudentRecord[]>([]);

  useEffect(() => {
    const getStudentProfiles = async () => {
      try {
        const { data, error } = await supabase.from("student_record").select();

        if (error) {
          throw error;
        }

        setStudentRecord(
          data.map((record) => ({ ...record, id: String(record.id) }))
        );
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.log(String(err));
        }
      } finally {
        setLoading(false);
      }
    };
    getStudentProfiles();
  }, []);

  useEffect(() => {
    console.log("This is list of student record data: ", studentRecord);
  }, [studentRecord]);

  const handleStudentChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const studentId = event.currentTarget.value;
    const studentData = studentRecord.find(
      (student) => student.id === studentId
    );
    console.log("Found student:", studentData);
    console.log(studentId);
    setSelectedStudent(studentData);
  };

  return (
    <>
      <div className="w-75 d-flex justify-content-center border m-auto mt-3">
        <Form className="">
          <Form.Group className="mb-3" controlId="selectStudent">
            <Form.Label>Select student</Form.Label>
            <Form.Select
              required
              as="select"
              defaultValue=""
              onChange={handleStudentChange}
            >
              <option value="" disabled>
                Please select a student profile
              </option>

              {studentRecord.map((student) => (
                <option
                  key={student.id}
                  value={student.id}
                >{`${student.english_first_name} ${student.english_last_name}`}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </div>
      {selectedStudent && <StudentProfile student={selectedStudent} />}
      <BackDrop
        toggle={loading}
        handleClose={() => {
          console.log("this is to close on click");
        }}
      />
    </>
  );
}

export default HomePage;
