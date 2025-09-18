import React, { useState } from "react";

function ProductManagement({ products, setProducts }) {
  const [product, setProduct] = useState({ name: "", price: "", quantity: "", image: "", category: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingProduct, setEditingProduct] = useState({});

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const addProduct = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.quantity) return;

    const newProduct = {
      ...product,
      id: Date.now().toString(),
      price: Number(product.price),
      quantity: Number(product.quantity),
    };

    setProducts([...products, newProduct]);
    setProduct({ name: "", price: "", quantity: "", image: "", category: "" });
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingProduct({ ...products[index] });
  };

  const handleEditChange = (e) =>
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });

  const saveEdit = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...editingProduct,
      price: Number(editingProduct.price),
      quantity: Number(editingProduct.quantity),
    };
    setProducts(updatedProducts);
    setEditingIndex(null);
  };

  const cancelEdit = () => setEditingIndex(null);

  const deleteProduct = (index) => {
    if (window.confirm(`Delete ${products[index].name}?`)) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    }
  };

  const increaseStock = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    setProducts(updatedProducts);
  };

  const decreaseStock = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 0) updatedProducts[index].quantity -= 1;
    setProducts(updatedProducts);
  };

  const checkStock = (qty) => (qty === 0 ? "Sold Out" : qty <= 5 ? "Low Stock" : "In Stock");

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", color: "#85586F" }}>Product Management</h1>

      {/* Add Product Form */}
      <form onSubmit={addProduct} style={{ marginBottom: "20px" }}>
        <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={product.category} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price (M)" value={product.price} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" value={product.quantity} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={product.image} onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>

      {/* Product Table */}
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price (M)</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.id}>
                {editingIndex === i ? (
                  <>
                    <td><input name="name" value={editingProduct.name} onChange={handleEditChange} /></td>
                    <td><input name="category" value={editingProduct.category} onChange={handleEditChange} /></td>
                    <td><input name="price" type="number" value={editingProduct.price} onChange={handleEditChange} /></td>
                    <td><input name="quantity" type="number" value={editingProduct.quantity} onChange={handleEditChange} /></td>
                    <td>{checkStock(editingProduct.quantity)}</td>
                    <td>
                      <button onClick={() => saveEdit(i)}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>M{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>{checkStock(p.quantity)}</td>
                    <td>
                      <button onClick={() => increaseStock(i)}>▲</button>
                      <button onClick={() => decreaseStock(i)}>▼</button>
                      <button onClick={() => startEditing(i)}>Edit</button>
                      <button onClick={() => deleteProduct(i)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products added yet.</p>
      )}
    </div>
  );
}

export default ProductManagement;
