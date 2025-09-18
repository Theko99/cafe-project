import React from "react";

function Dashboard({ products }) {
  const groupedProducts = products.reduce((acc, p) => {
    const cat = p.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const checkStock = (qty) =>
    qty === 0 ? "Sold Out" : qty <= 5 ? "Low Stock" : "In Stock";


  const defaultImage = "https://via.placeholder.com/120";

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
                >
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
                      src={p.image || defaultImage}
                      alt={p.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => (e.currentTarget.src = defaultImage)} // fallback image
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        margin: "0 0 10px",
                        fontSize: "22px",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      {p.name}
                    </h3>
                    {p.description && (
                      <p style={{ margin: "0 0 10px", fontSize: "16px", color: "#555" }}>
                        {p.description}
                      </p>
                    )}
                    <p style={{ margin: "0 0 8px", fontSize: "16px", color: "#666" }}>
                      Price: M {p.price.toFixed(2)} | Qty: {p.quantity}
                    </p>
                    <span
                      style={{
                        color:
                          p.quantity === 0
                            ? "red"
                            : p.quantity <= 5
                            ? "#f7b500"
                            : "#85586F",
                        fontWeight: "600",
                      }}
                    >
                      {checkStock(p.quantity)}
                    </span>
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
