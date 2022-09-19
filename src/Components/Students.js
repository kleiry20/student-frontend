import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import Header from "./Header";
import axios from "axios";

const Students = () => {
  const [record_ID, setRecordID] = useState("");
  const [studentItem, setStudentItem] = useState("");

  const [show, setShow] = useState(false);
  // Student get request parameters
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [studID, setstudID] = useState("");
  const [email, setEmail] = useState("");
  const [students, setStudents] = useState([]);

  // Student Class Map get req params
  const [maps, setMaps] = useState([]);

  // New modal
  const [newshow, setNewShow] = useState(false);
  const newhandleClose = () => setNewShow(false);
  const newhandleShow = () => setNewShow(true);

  // delete records params
  const [delshow, setDelShow] = useState(false);
  const handleDelClose = () => setDelShow(false);
  const handleDelShow = () => setDelShow(true);
  //

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
      handleDelClose();
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
  // fetching student details
  useEffect(() => {
    if (!show) {
      axios.get(`http://127.0.0.1:8000/students/`).then((response) => {
        setStudents(response.data);
      });
    }
  }, [show, delshow]);

  // fetching Student Class Map dtails
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/maps/${studentItem.id}`)
      .then((response) => {
        setMaps(response.data);
      });
  }, [studentItem.id]);

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
                      onClick={() => {
                        setStudentItem(student);
                        newhandleShow();
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleShow(student)}
                    >
                      Update
                    </Button>{" "}
                    <Button variant="danger" onClick={handleDelShow}>
                      Wanna delete?
                    </Button>{" "}
                    <Modal
                      show={delshow}
                      onHide={handleDelClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Alert!! Please review</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure to delete this record?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleDelClose}>
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => onDelete(student.id)}
                        >
                          Yes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <Modal show={newshow} onHide={newhandleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
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
                  <tr>
                    <td>{studentItem.id}</td>
                    <td>{studentItem.fname}</td>
                    <td>{studentItem.lname}</td>
                    <td>{studentItem.studID}</td>
                    <td>{studentItem.email}</td>
                  </tr>
                </tbody>
              </Table>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Standard ID</th>
                    <th>Student ID</th>
                    <th>Rank</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {maps.map((studentMap) => {
                    return (
                      <tr>
                        <td>{studentMap.stdID}</td>
                        <td>{studentMap.studID}</td>
                        <td>{studentMap.rank}</td>
                        <td>{studentMap.marks}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Modal.Body>
          </Modal>
        </Table>
      </div>
    </>
  );
};

export default Students;
