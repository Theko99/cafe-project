import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProductManagement from "./components/ProductManagement";
import Inventory from "./components/Inventory";
import Reports from "./components/Reports";
import Sales from "./components/Sales";
import Footer from "./components/Footer";
import { productsData } from "./data"; // fallback data
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Try to fetch from backend first
    fetch("http://localhost:5000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Backend not available");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data));
      })
      .catch(() => {
        // Fallback: check localStorage, else use productsData
        const saved = localStorage.getItem("products");
        if (saved) {
          setProducts(JSON.parse(saved));
        } else {
          setProducts(productsData);
          localStorage.setItem("products", JSON.stringify(productsData));
        }
      });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  return (
    <Router>
      <Navbar />
      <div className="container" style={{ paddingBottom: "80px" }}>
        <Routes>
          <Route path="/" element={<Dashboard products={products} />} />
          <Route
            path="/products"
            element={<ProductManagement products={products} setProducts={setProducts} />}
          />
          <Route path="/inventory" element={<Inventory products={products} />} />
          <Route path="/reports" element={<Reports products={products} />} />
          <Route
            path="/sales"
            element={<Sales products={products} setProducts={setProducts} />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
