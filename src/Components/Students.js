import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import Header from "./Header";
import axios from "axios";
// import StudentViewModal from "./StudentViewModal";

function StudentViewModal(props) {
  const [students, setStudents] = useState([]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Student Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Roll Number</th>
              <th>Email Id</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              return (
                <tr>
                  <td>{student.id}</td>
                  <td>{student.fname}</td>
                  <td>{student.lname}</td>
                  <td>{student.studID}</td>
                  <td>{student.email}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Students = () => {
  const [record_ID, setRecordID] = useState("");

  const [show, setShow] = useState(false);
  // get request parameters
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [studID, setstudID] = useState("");
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);
  // StudentViewModal
  const [modalShow, setModalShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (record) => {
    console.log(record.fname);
    // setfname("hellllllo");
    setRecordID(record.id);
    setfname(record.fname);
    setlname(record.lname);
    setEmail(record.email);
    setstudID(record.studID);
    setTimeout(() => {
      setShow(true);
    }, 60);
  };

  // delete record and then update table
  const onDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/students/${id}`).then(() => {
      getData();
    });
  };
  const getData = () => {
    axios.get(`http://127.0.0.1:8000/students/`).then((getData) => {
      setStudents(getData.data);
    });
  };

  // update api call (put request)

  // create api call (post request)
  const postData = () => {
    if (record_ID) {
      axios
        .put(`http://127.0.0.1:8000/students/${record_ID}`, {
          fname,
          lname,
          studID,
          email,
        })
        .then((response) => {
          students.push(response.data);
        });
    } else {
      axios
        .post(`http://127.0.0.1:8000/students/`, {
          fname,
          lname,
          studID,
          email,
        })
        .then((response) => {
          students.push(response.data);
        });
    }
    handleClose();
  };

  useEffect(() => {
    if (!show) {
      axios.get(`http://127.0.0.1:8000/students/`).then((response) => {
        setStudents(response.data);
      });
    }
  }, [show]);

  return (
    <>
      <Header />
      <h3 className="mt-3 mb-2 mx-3 ms-5">List of all the Students</h3>
      <Button
        onClick={() => handleShow({})}
        variant="outline-primary"
        className="ms-5 mb-2 my-2"
      >
        Add New Student
      </Button>{" "}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={(e) => setfname(e.target.value)}
                type="text"
                defaultValue={fname}
                placeholder="Enter First Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={(e) => setlname(e.target.value)}
                type="text"
                defaultValue={lname}
                placeholder="Enter Last Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                onChange={(e) => setstudID(e.target.value)}
                type="text"
                defaultValue={studID}
                placeholder="Enter Roll Number"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                defaultValue={email}
                placeholder="name@example.com"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={postData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="ms-5 me-5 mt-3 text-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Roll Number</th>
              <th>Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              return (
                <tr>
                  <td>{student.id}</td>
                  <td>{student.fname}</td>
                  <td>{student.lname}</td>
                  <td>{student.studID}</td>
                  <td>{student.email}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setModalShow(true)}
                    >
                      View
                    </Button>
                    <StudentViewModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />{" "}
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleShow(student)}
                    >
                      Update
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(student.id)}
                    >
                      Delete
                    </Button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Students;

// alert("Delete this record?")
