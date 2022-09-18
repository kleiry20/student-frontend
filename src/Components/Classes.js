import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import Header from "./Header";
import axios from "axios";

function StandardViewModal(props) {
  const [standards, setStandards] = useState([]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Standard Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Standard ID</th>
              <th>Standard Name</th>
            </tr>
          </thead>
          <tbody>
            {standards.map((standard) => {
              return (
                <tr>
                  <td>{standard.id}</td>
                  <td>{standard.stdID}</td>
                  <td>{standard.stdName}</td>
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

const Classes = () => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const [stdID, setstdID] = useState("");
  const [stdName, setstdName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [standards, setStandards] = useState([]);

  useEffect(() => {}, []);

  const postData = () => {
    axios
      .post(`http://127.0.0.1:8000/standards/`, {
        stdID,
        stdName,
      })
      .then((response) => {
        standards.push(response.data);
      });
    handleClose();
  };
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/standards/`).then((response) => {
      setStandards(response.data);
    });
  }, [show]);

  return (
    <>
      <Header />
      <h3 className="mt-3 mb-2 mx-3 ms-5">List of all the Classes</h3>
      <Button
        onClick={handleShow}
        variant="outline-primary"
        className="ms-5 mb-2 my-2"
      >
        Add New Standard
      </Button>{" "}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Standard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Standard ID</Form.Label>
              <Form.Control
                onChange={(e) => setstdID(e.target.value)}
                type="text"
                placeholder="Enter Standard ID"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Standard Name</Form.Label>
              <Form.Control
                onChange={(e) => setstdName(e.target.value)}
                type="text"
                placeholder="Enter Standard Name"
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
              <th>Standard ID</th>
              <th>Standard Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {standards.map((standard) => {
              return (
                <tr>
                  <td>{standard.id}</td>
                  <td>{standard.stdID}</td>
                  <td>{standard.stdName}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setModalShow(true)}
                    >
                      View
                    </Button>
                    <StandardViewModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />{" "}
                    <Button variant="success" size="sm" onClick={handleShow}>
                      Update
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => alert("Delete this record?")}
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

export default Classes;
