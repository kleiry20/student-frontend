// import React, { useState, useEffect } from "react";
// import { Table } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";

// const StudentViewModal = (props) => {
//   const [students, setStudents] = useState([]);

//   return (
//     <>
//       <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Student Details
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Serial Number</th>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Roll Number</th>
//                 <th>Email Id</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student) => {
//                 return (
//                   <tr>
//                     <td>{student.id}</td>
//                     <td>{student.fname}</td>
//                     <td>{student.lname}</td>
//                     <td>{student.studID}</td>
//                     <td>{student.email}</td>
//                     <td></td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </Table>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={props.onHide}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default StudentViewModal;
