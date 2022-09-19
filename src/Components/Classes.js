import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import Header from "./Header";
import axios from "axios";

const Classes = () => {
  const [record_ID, setRecordID] = useState("");
  const [studentItem, setStudentItem] = useState("");

  const [show, setShow] = useState(false);

  // Standard get request parameters
  const [stdID, setstdID] = useState("");
  const [stdName, setstdName] = useState("");
  const [standards, setStandards] = useState([]);

  // Student Class Map get req params
  // const [maps, setMaps] = useState([]);

  // delete records params
  const [delshow, setDelShow] = useState(false);
  const handleDelClose = () => setDelShow(false);
  const handleDelShow = () => setDelShow(true);
  //

  const handleClose = () => setShow(false);
  const handleShow = (record) => {
    // console.log("hiiiiiiiiii");
    setRecordID(record.id);
    setstdID(record.stdID);
    setstdName(record.stdName);
    setTimeout(() => {
      setShow(true);
    }, 60);
  };

  // delete record and then update table
  const onDelete = (id) => {
    axios
      .delete(`https://gloify-student-backend.herokuapp.com/standards/${id}`)
      .then(() => {
        handleDelClose();
      });
  };
  const getData = () => {
    axios
      .get(`https://gloify-student-backend.herokuapp.com/standards/`)
      .then((getData) => {
        setStandards(getData.data);
      });
  };

  // create api call (post request)
  const postData = () => {
    if (record_ID) {
      axios
        .put(
          `https://gloify-student-backend.herokuapp.com/standards/${record_ID}`,
          {
            stdID,
            stdName,
          }
        )
        .then((response) => {
          standards.push(response.data);
        });
    } else {
      axios
        .post(`https://gloify-student-backend.herokuapp.com/standards/`, {
          stdID,
          stdName,
        })
        .then((response) => {
          standards.push(response.data);
        });
    }
    handleClose();
  };
  // fetching standard details
  useEffect(() => {
    if (!show) {
      axios
        .get(`https://gloify-student-backend.herokuapp.com/standards/`)
        .then((response) => {
          setStandards(response.data);
        });
    }
  }, [show, delshow]);

  // fetching Student Class Map dtails
  // useEffect(() => {
  //   axios
  //     .get(`https://gloify-student-backend.herokuapp.com/maps/${studentItem.id}`)
  //     .then((response) => {
  //       setMaps(response.data);
  //     });
  // }, [studentItem.id]);

  return (
    <>
      <Header />
      <h3 className="mt-3 mb-2 mx-3 ms-5">List of all the Classes</h3>
      <Button
        onClick={() => handleShow({})}
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
                defaultValue={stdID}
                placeholder="Enter Standard ID"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Standard Name</Form.Label>
              <Form.Control
                onChange={(e) => setstdName(e.target.value)}
                type="text"
                defaultValue={stdName}
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
                      variant="success"
                      size="sm"
                      onClick={() => handleShow(standard)}
                    >
                      Update
                    </Button>{" "}
                    <Button variant="danger" size="sm" onClick={handleDelShow}>
                      Delete
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
                          onClick={() => onDelete(standard.id)}
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
        </Table>
      </div>
    </>
  );
};

export default Classes;
