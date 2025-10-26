const BASE_URL = "http://localhost:8080/api/employees";

export const getEmployees = () => fetch(BASE_URL).then(res => res.json());

export const addEmployee = (employee) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });

export const updateEmployee = (id, employee) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });

export const deleteEmployee = (id) =>
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" });