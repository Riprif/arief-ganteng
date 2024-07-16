// src/components/StudentCrud.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IntlMessages from "util/IntlMessages";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../../appRedux/actions/studentActions";

const StudentCrud = () => {
  const dispatch = useDispatch();
  const { students, error } = useSelector((state) => state.student);

  const [formData, setFormData] = useState({ name: "", birthDate: "", nisn: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateStudent(formData));
      setIsEditing(false);
    } else {
      dispatch(addStudent(formData));
    }
    setFormData({ name: "", birthDate: "", nisn: "" });
  };

  const handleEdit = (id) => {
    const student = students.find((student) => student._id === id);
    setFormData(student);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="student-crud">
      <h2 className="title gx-mb-4">
        <IntlMessages id="student.crud.title" defaultMessage="Student CRUD" />
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="birthDate"
          placeholder="Birth Date"
          value={formData.birthDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="nisn"
          placeholder="NISN"
          value={formData.nisn}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.birthDate} - NISN: {student.nisn}
            <button onClick={() => handleEdit(student._id)}>Edit</button>
            <button onClick={() => handleDelete(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentCrud;