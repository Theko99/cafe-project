import React from "react";

function Inventory({ products }) {
  const checkStock = (qty) =>
    qty > 5 ? "In Stock" : qty > 0 ? "Low Stock" : "Out of Stock";

  const getRowStyle = (qty) => {
    if (qty === 0) return { backgroundColor: "#ffcccc", color: "#8b0000" };
    if (qty <= 5) return { backgroundColor: "#fff4cc", color: "#856404" };
    return { backgroundColor: "#e6ffe6", color: "#155724" };
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#fdf6e3",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#85586F",
          marginBottom: "30px",
          fontSize: "2rem",
        }}
      >
        Inventory
      </h1>

      <div
        style={{
          overflowX: "auto",
          borderRadius: "12px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "600px",
          }}
        >
          <thead style={{ backgroundColor: "#85586F", color: "#fff" }}>
            <tr>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "12px 15px", textAlign: "right" }}>Price (M)</th>
              <th style={{ padding: "12px 15px", textAlign: "right" }}>Quantity</th>
              <th style={{ padding: "12px 15px", textAlign: "center" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id} style={getRowStyle(p.quantity)}>
                  <td style={{ padding: "12px 15px" }}>{p.name}</td>
                  <td style={{ padding: "12px 15px", textAlign: "right" }}>
                    M {(p.price || 0).toFixed(2)}
                  </td>
                  <td style={{ padding: "12px 15px", textAlign: "right" }}>
                    {p.quantity || 0}
                  </td>
                  <td style={{ padding: "12px 15px", textAlign: "center", fontWeight: "bold" }}>
                    {checkStock(p.quantity)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: "20px", textAlign: "center" }}>
                  No products in inventory.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
