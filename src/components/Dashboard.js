import React, { useState, useEffect } from "react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setError(`Failed to load products. Is json-server running? (${err.message})`);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const groupedProducts = products.reduce((acc, p) => {
    const cat = p.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        background: "radial-gradient(circle at top left, #fdfaf6, #f8f0e7, #f4e7d6)",
      }}
    >
      <div
        style={{
          width: "95%",
          maxWidth: 1200,
          margin: "0 auto",
          borderRadius: "20px",
          padding: "40px",
          background: "#fff",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#85586F",
            fontSize: "36px",
            fontWeight: "700",
            marginBottom: "30px",
          }}
        >
          Product Menu
        </h1>

        {loading && <p style={{ textAlign: "center" }}>Loading products...</p>}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {Object.keys(groupedProducts).map((category) => (
          <div key={category} style={{ marginBottom: "50px" }}>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: "600",
                color: "#85586F",
                marginBottom: "20px",
                borderBottom: "2px solid #85586F",
                display: "inline-block",
                paddingBottom: "5px",
              }}
            >
              {category}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
                marginTop: "15px",
              }}
            >
              {groupedProducts[category].map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "30px",
                    borderRadius: "20px",
                    background: "#fff8f0",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    minHeight: "180px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 14px 30px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
                  }}
                >
                  {/* Product Image */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: "120px",
                      height: "120px",
                      borderRadius: "15px",
                      overflow: "hidden",
                      marginRight: "25px",
                      border: "2px solid #85586F30",
                    }}
                  >
                    <img
                      src={p.image || "https://via.placeholder.com/120"}
                      alt={p.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: "0 0 10px", fontSize: "22px", fontWeight: "600", color: "#333" }}>
                      {p.name}
                    </h3>
                    {p.description && <p style={{ margin: "0 0 10px", fontSize: "16px", color: "#555" }}>{p.description}</p>}
                    <p style={{ margin: "0 0 8px", fontSize: "16px", color: "#666" }}>
                      Price: M {p.price.toFixed(2)} | Qty: {p.quantity}
                    </p>
                    {p.quantity === 0 && <span style={{ color: "red", fontWeight: "600" }}>Sold Out</span>}
                    {p.quantity > 0 && p.quantity <= 5 && <span style={{ color: "#f7b500", fontWeight: "600" }}>Low Stock</span>}
                    {p.quantity > 5 && <span style={{ color: "#85586F", fontWeight: "600" }}>In Stock</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
