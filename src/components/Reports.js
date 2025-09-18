import React, { useEffect, useState } from "react";

function Reports({ products }) {
  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];
    setSalesHistory(storedHistory);
  }, []);

  const checkStock = (qty) =>
    qty === 0 ? "Sold Out" : qty <= 5 ? "Low Stock" : "In Stock";

  const totalStock = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const lowStockCount = products.filter((p) => p.quantity <= 5).length;
  const totalSales = salesHistory.reduce((sum, s) => sum + s.totalPrice, 0);

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        backgroundColor: "#F5F0EB",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#85586F",
          marginBottom: "25px",
          fontSize: "32px",
        }}
      >
        Reports Dashboard
      </h1>

      {/* Overview Section */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto 30px auto",
          padding: "25px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "15px", color: "#333" }}>Overview</h2>
        <p style={{ fontSize: "20px", marginBottom: "10px" }}>
          Total Products: <strong>{products.length}</strong>
        </p>
        <p style={{ fontSize: "20px", marginBottom: "10px" }}>
          Total Stock: <strong>{totalStock}</strong>
        </p>
        <p style={{ fontSize: "20px", marginBottom: "10px" }}>
          Low Stock Products: <strong>{lowStockCount}</strong>
        </p>
        <p style={{ fontSize: "20px" }}>
          Total Sales Value: <strong>M {totalSales.toFixed(2)}</strong>
        </p>
      </div>

      {/* Products Table */}
      <div
        style={{
          overflowX: "auto",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "15px", color: "#85586F" }}>Products</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "16px" }}>
          <thead>
            <tr style={{ backgroundColor: "#85586F", color: "#fff", textAlign: "center" }}>
              <th style={{ padding: "12px" }}>Name</th>
              <th style={{ padding: "12px" }}>Price</th>
              <th style={{ padding: "12px" }}>Quantity</th>
              <th style={{ padding: "12px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                style={{
                  backgroundColor:
                    p.quantity === 0 ? "#FF6B6B33" : p.quantity <= 5 ? "#F7D79466" : "#fff",
                  transition: "background 0.3s",
                  textAlign: "center",
                }}
              >
                <td style={{ padding: "12px" }}>{p.name}</td>
                <td style={{ padding: "12px" }}>M {p.price.toFixed(2)}</td>
                <td style={{ padding: "12px" }}>{p.quantity}</td>
                <td
                  style={{
                    padding: "12px",
                    fontWeight: "bold",
                    color: p.quantity === 0 ? "#d60000" : p.quantity <= 5 ? "#b07d00" : "#388E3C",
                  }}
                >
                  {checkStock(p.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sales History */}
      <div
        style={{
          overflowX: "auto",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "15px", color: "#85586F" }}>Sales History</h2>
        {salesHistory.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "16px" }}>
            <thead>
              <tr style={{ backgroundColor: "#85586F", color: "#fff", textAlign: "center" }}>
                <th style={{ padding: "12px" }}>Date</th>
                <th style={{ padding: "12px" }}>Product</th>
                <th style={{ padding: "12px" }}>Quantity</th>
                <th style={{ padding: "12px" }}>Total Price (M)</th>
              </tr>
            </thead>
            <tbody>
              {salesHistory.map((sale) => (
                <tr
                  key={sale.id}
                  style={{ textAlign: "center", backgroundColor: "#fff3d6" }}
                >
                  <td style={{ padding: "10px" }}>{sale.date}</td>
                  <td style={{ padding: "10px" }}>{sale.productName}</td>
                  <td style={{ padding: "10px" }}>{sale.quantity}</td>
                  <td style={{ padding: "10px" }}>M {sale.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", marginTop: "10px" }}>No sales recorded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Reports;
