import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { EmployeeContext } from "../contexts/EmployeeContext";
import AddForm from "./AddForm";
import Employee from "./Employee";
import Pagination from "./Pagination";

const EmployeeList = () => {
  const { sortedEmployees } = useContext(EmployeeContext);

  const [showAlert, setShowAlert] = useState(false)
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [employeesPerPage] = useState(2)

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleShowAlert = () => {
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 5000)
  }

  useEffect(() => {
    handleClose();

    return () => {
      handleShowAlert()
    }
  }, [sortedEmployees]);

  const indexOfLastEmployee = currentPage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
  const currentEmployee = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)
  const totalPageNum = Math.ceil(sortedEmployees.length / employeesPerPage)

  return (
    <React.Fragment>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              Manage <b>Employees</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <Button
              href="#addEmployeeModal"
              className="btn btn-success text-white"
              data-toggle="modal"
              onClick={handleShow}
            >
              <i className="material-icons">&#xE147;</i>{" "}
              <span>Add New Employee</span>
            </Button>
          </div>
        </div>
      </div>

      <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>Emplooye List was successfully updated!</Alert>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            currentEmployee.map((employee) => (
              <tr key={employee.id}>
                <Employee employee={employee} />
              </tr>
            ))
            // currentEmployee.sort((a, b) => a.name.localeCompare(b.name)).map((employee) => (
            //   <tr key={employee.id}>
            //     <Employee employee={employee} />
            //   </tr>
            // ))
          }
        </tbody>
      </table>

      <Pagination pages={totalPageNum} setCurrentPage={setCurrentPage}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default EmployeeList;
