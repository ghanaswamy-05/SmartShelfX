import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";
import "./ProductManager.css"; // Optional CSS

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: "",
    reorderThreshold: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProducts().then(setProducts).catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name ||
      form.quantity === "" ||
      form.reorderThreshold === "" ||
      parseInt(form.quantity) < 0 ||
      parseInt(form.reorderThreshold) < 0
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    const payload = {
      ...form,
      quantity: parseInt(form.quantity),
      reorderThreshold: parseInt(form.reorderThreshold),
    };

    const action = editingId
      ? updateProduct(editingId, payload)
      : addProduct(payload);

    action
      .then(() => {
        loadProducts();
        resetForm();
      })
      .catch((err) => {
        console.error(err);
        alert("Operation failed.");
      });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      quantity: "",
      reorderThreshold: "",
    });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      quantity: product.quantity.toString(),
      reorderThreshold: product.reorderThreshold.toString(),
    });
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
        .then(() => loadProducts())
        .catch((err) => {
          console.error(err);
          alert("Delete failed.");
        });
    }
  };

  return (
    <div className="product-manager">
      <h2>Product Manager</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Reorder Threshold"
          value={form.reorderThreshold}
          onChange={(e) =>
            setForm({ ...form, reorderThreshold: e.target.value })
          }
        />
        <button type="submit">
          {editingId ? "Update" : "Add"} Product
        </button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      <ul className="product-list">
        {products.map((p) => (
          <li key={p.id} className="product-item">
            <strong>{p.name}</strong> ( Remaining Quantity {p.quantity}) –> Reorder at{" "}
            {p.reorderThreshold}
            <div className="product-actions">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}