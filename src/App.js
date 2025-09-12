import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProductManagement from "./components/ProductManagement";
import Inventory from "./components/Inventory";
import Reports from "./components/Reports";
import Sales from "./components/Sales";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch from proxy (port 5000)
  useEffect(() => {
    fetch("/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load products. Make sure JSON server is running.");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  }, []);

  // ✅ Update products properly
  const updateProducts = (newProducts) => {
    setProducts(newProducts);
    newProducts.forEach((product) => {
      fetch(`/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }).catch((err) => console.error("Update failed:", err));
    });
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard products={products} />} />
            <Route
              path="/products"
              element={<ProductManagement products={products} setProducts={updateProducts} />}
            />
            <Route path="/inventory" element={<Inventory products={products} />} />
            <Route path="/reports" element={<Reports products={products} />} />
            <Route path="/sales" element={<Sales products={products} setProducts={updateProducts} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
