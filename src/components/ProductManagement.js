import React, { useState, useEffect } from "react";

function ProductManagement({ products, setProducts }) {
  const [product, setProduct] = useState({ name: "", description: "", category: "", price: "", quantity: "", image: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingProduct, setEditingProduct] = useState({});
  const [error, setError] = useState(null);
  const API_URL = "/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Make sure the server is running.");
      }
    };
    fetchProducts();
  }, [setProducts]);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const addProduct = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.quantity) return;
    const newProduct = { ...product, price: Number(product.price), quantity: Number(product.quantity) };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const saved = await res.json();
      setProducts([...products, saved]);
      setProduct({ name: "", description: "", category: "", price: "", quantity: "", image: "" });
    } catch {
      setError("Failed to add product.");
    }
  };

  const saveEdit = async (index) => {
    const updated = { ...editingProduct, price: Number(editingProduct.price), quantity: Number(editingProduct.quantity) };
    try {
      const res = await fetch(`${API_URL}/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const saved = await res.json();
      const updatedProducts = [...products];
      updatedProducts[index] = saved;
      setProducts(updatedProducts);
      setEditingIndex(null);
    } catch {
      setError("Failed to update product.");
    }
  };

  const deleteProduct = async (index) => {
    const p = products[index];
    if (!window.confirm(`Delete ${p.name}?`)) return;
    try {
      const res = await fetch(`${API_URL}/${p.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    } catch {
      setError("Failed to delete product.");
    }
  };

  const updateStock = async (index, change) => {
    const p = { ...products[index], quantity: products[index].quantity + change };
    if (p.quantity < 0) return;
    try {
      const res = await fetch(`${API_URL}/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const saved = await res.json();
      const updatedProducts = [...products];
      updatedProducts[index] = saved;
      setProducts(updatedProducts);
    } catch {
      setError("Failed to update stock.");
    }
  };

  const checkStock = (qty) => (qty === 0 ? "Sold Out" : qty <= 5 ? "Low Stock" : "In Stock");

  return (
    <div style={{ padding: "30px", fontFamily: "Poppins, sans-serif", backgroundColor: "#fdf6e3", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#85586F", marginBottom: "25px" }}>Product Management</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div style={{ padding: "20px", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", backgroundColor: "#fff", marginBottom: "30px" }}>
        <h2 style={{ color: "#85586F", marginBottom: "15px" }}>Product List</h2>
        {products.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f1f1f1" }}>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price (M)</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id} style={{ textAlign: "center", backgroundColor: i % 2 === 0 ? "#fafafa" : "#fff" }}>
                  {editingIndex === i ? (
                    <>
                      <td><input name="image" value={editingProduct.image || ""} onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })} /></td>
                      <td><input name="name" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} /></td>
                      <td><input name="description" value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} /></td>
                      <td><input name="category" value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} /></td>
                      <td><input name="price" type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} /></td>
                      <td><input name="quantity" type="number" value={editingProduct.quantity} onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })} /></td>
                      <td>{checkStock(editingProduct.quantity)}</td>
                      <td>
                        <button onClick={() => saveEdit(i)} style={{ marginRight: 5 }}>Save</button>
                        <button onClick={() => setEditingIndex(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td><img src={p.image || "https://via.placeholder.com/50"} alt={p.name} style={{ width: "60px", height: "60px", borderRadius: "10px", objectFit: "cover" }} /></td>
                      <td>{p.name}</td>
                      <td>{p.description}</td>
                      <td>{p.category}</td>
                      <td>M{p.price.toFixed(2)}</td>
                      <td>{p.quantity}</td>
                      <td>{checkStock(p.quantity)}</td>
                      <td>
                        <button onClick={() => updateStock(i, 1)}>▲</button>
                        <button onClick={() => updateStock(i, -1)}>▼</button>
                        <button onClick={() => { setEditingIndex(i); setEditingProduct({ ...p }); }}>Edit</button>
                        <button onClick={() => deleteProduct(i)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center" }}>No products added yet.</p>
        )}
      </div>


      <div style={{ padding: "20px", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", backgroundColor: "#fff", width: "450px", margin: "0 auto" }}>
        <h2 style={{ color: "#85586F", textAlign: "center", marginBottom: "15px" }}>Add New Product</h2>
        <form onSubmit={addProduct} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input name="image" placeholder="Image URL" value={product.image} onChange={handleChange} />
          <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
          <input name="description" placeholder="Description" value={product.description} onChange={handleChange} />
          <input name="category" placeholder="Category" value={product.category} onChange={handleChange} />
          <input name="price" type="number" placeholder="Price (M)" value={product.price} onChange={handleChange} required />
          <input name="quantity" type="number" placeholder="Quantity" value={product.quantity} onChange={handleChange} required />
          <button type="submit" style={{ backgroundColor: "#85586F", color: "#fff", padding: "10px", borderRadius: "8px" }}>Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default ProductManagement;
