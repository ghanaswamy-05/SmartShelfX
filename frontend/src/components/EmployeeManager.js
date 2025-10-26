import React, { useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employeeApi";
import "./EmployeeManager.css";

export default function EmployeeManager() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", department: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    getEmployees().then(setEmployees).catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.department || !form.email) {
      alert("Please fill all fields.");
      return;
    }

    const action = editingId
      ? updateEmployee(editingId, form)
      : addEmployee(form);

    action
      .then(() => {
        loadEmployees();
        resetForm();
      })
      .catch((err) => {
        console.error(err);
        alert("Operation failed.");
      });
  };

  const resetForm = () => {
    setForm({ name: "", department: "", email: "" });
    setEditingId(null);
  };

  const handleEdit = (emp) => {
    setForm({ name: emp.name, department: emp.department, email: emp.email });
    setEditingId(emp.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this employee?")) {
      deleteEmployee(id)
        .then(() => loadEmployees())
        .catch((err) => {
          console.error(err);
          alert("Delete failed.");
        });
    }
  };

  return (
    <div className="employee-manager">
      <h2>Employee Manager</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div className="form-buttons">
          <button type="submit">
            {editingId ? "Update" : "Add"} Employee
          </button>
          {editingId && (
            <button type="button" className="cancel" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            <strong>{emp.name}</strong> ({emp.department}) - {emp.email}
            <div>
              <button onClick={() => handleEdit(emp)}>Edit</button>
              <button onClick={() => handleDelete(emp.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}