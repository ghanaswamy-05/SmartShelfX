const BASE_URL = "http://localhost:8080/api/products";

export const getProducts = () => fetch(BASE_URL).then(res => res.json());

export const addProduct = (product) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

export const updateProduct = (id, product) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

export const deleteProduct = (id) =>
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" });