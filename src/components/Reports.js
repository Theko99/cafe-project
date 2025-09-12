import React, { useState, useEffect } from "react";

function Reports() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);
  const API_PRODUCTS = "/products";
  const API_SALES = "/sales";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProducts, resSales] = await Promise.all([
          fetch(API_PRODUCTS),
          fetch(API_SALES),
        ]);

        if (!resProducts.ok)
          throw new Error(`Products HTTP error! Status: ${resProducts.status}`);
        if (!resSales.ok)
          throw new Error(`Sales HTTP error! Status: ${resSales.status}`);

        const dataProducts = await resProducts.json();
        const dataSales = await resSales.json();

        setProducts(dataProducts);
        setSales(dataSales);
      } catch (err) {
        console.error(err);
        setError(
          "Failed to load products or sales. Make sure the server is running."
        );
      }
    };

    fetchData();
  }, []);

  const checkStock = (qty) =>
    qty === 0 ? "Sold Out" : qty <= 5 ? "Low Stock" : "In Stock";

  const totalStock = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const lowStockCount = products.filter((p) => p.quantity <= 5).length;
  const totalRevenue = sales.reduce(
    (sum, s) => sum + (s.total || s.price * s.quantity),
    0
  );

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

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

     
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
        <h2 style={{ fontSize: "28px", marginBottom: "15px", color: "#333" }}>
          Overview
        </h2>
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
          Total Revenue: <strong>M {totalRevenue.toFixed(2)}</strong>
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        {[
          { label: "Total Products", value: products.length, color: "#85586F" },
          { label: "Total Stock", value: totalStock, color: "#FFB347" },
          { label: "Low Stock Products", value: lowStockCount, color: "#FF6B6B" },
          { label: "Total Revenue", value: `M ${totalRevenue.toFixed(2)}`, color: "#4CAF50" },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              background: card.color,
              color: "#fff",
              padding: "20px",
              borderRadius: "12px",
              minWidth: "180px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ marginBottom: "10px" }}>{card.label}</h3>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Products Table */}
      <div
        style={{
          overflowX: "auto",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "16px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#85586F",
                color: "#fff",
                textAlign: "center",
              }}
            >
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
                    p.quantity === 0
                      ? "#FF6B6B33"
                      : p.quantity <= 5
                      ? "#F7D79466"
                      : "#fff",
                  transition: "background 0.3s",
                  textAlign: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    p.quantity === 0
                      ? "#FF6B6B55"
                      : p.quantity <= 5
                      ? "#F7D79499"
                      : "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    p.quantity === 0
                      ? "#FF6B6B33"
                      : p.quantity <= 5
                      ? "#F7D79466"
                      : "#fff")
                }
              >
                <td style={{ padding: "12px" }}>{p.name}</td>
                <td style={{ padding: "12px" }}>M {p.price.toFixed(2)}</td>
                <td style={{ padding: "12px" }}>{p.quantity}</td>
                <td
                  style={{
                    padding: "12px",
                    fontWeight: "bold",
                    color:
                      p.quantity === 0
                        ? "#d60000"
                        : p.quantity <= 5
                        ? "#b07d00"
                        : "#388E3C",
                  }}
                >
                  {checkStock(p.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
