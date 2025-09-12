import React, { useState, useEffect } from "react";

function Sales({ products, setProducts }) {
  const [quantitiesToSell, setQuantitiesToSell] = useState({});
  const [salesHistory, setSalesHistory] = useState([]);
  const [error, setError] = useState(null);
  const API_URL = "/products"; 

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];
    setSalesHistory(storedHistory);
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantitiesToSell({ ...quantitiesToSell, [id]: value });
  };

  const sellProduct = async (product) => {
    const qty = parseInt(quantitiesToSell[product.id]);
    if (!qty || qty <= 0) return alert("Enter a valid quantity");
    if (qty > product.quantity) return alert("Not enough stock!");

    const updatedProduct = { ...product, quantity: product.quantity - qty };
    try {
      const res = await fetch(`${API_URL}/${updatedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const savedProduct = await res.json();

      const updatedProducts = products.map(p => (p.id === savedProduct.id ? savedProduct : p));
      setProducts(updatedProducts);

      const newSale = {
        id: Date.now(),
        productId: savedProduct.id,
        productName: savedProduct.name,
        quantity: qty,
        totalPrice: savedProduct.price * qty,
        date: new Date().toLocaleString(),
      };
      const updatedHistory = [newSale, ...salesHistory];
      setSalesHistory(updatedHistory);
      localStorage.setItem("salesHistory", JSON.stringify(updatedHistory));

      setQuantitiesToSell({ ...quantitiesToSell, [product.id]: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to record sale.");
    }
  };

  const checkStockStatus = (qty) => (qty === 0 ? "Sold Out" : qty <= 5 ? "Low Stock" : "In Stock");

  const getCardStyle = (qty) => {
    if (qty === 0) return { background: "linear-gradient(135deg, #ffd6d6, #ff6b6b)", color: "#fff" };
    if (qty <= 5) return { background: "linear-gradient(135deg, #fff3d6, #f7d794)", color: "#333" };
    return { background: "linear-gradient(135deg, #fdf0f5, #fff)", color: "#333" };
  };

  const totalValue = (p) => (p.price || 0) * (p.quantity || 0);

  return (
    <div style={{ padding: 30, backgroundColor: "#F8ECD1", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", display: "flex", justifyContent: "center" }}>
      

      <div style={{
        width: "95%",
        maxWidth: 1200,
        background: "linear-gradient(135deg, #fffaf0, #f8e4d1)",
        borderRadius: 20,
        padding: 30,
        boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
        border: "1px solid rgba(200, 200, 200, 0.3)"
      }}>
        <h1 style={{ textAlign: "center", color: "#85586F", marginBottom: 30 }}>Sales Module</h1>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 25, justifyItems: "center" }}>
          {products.map(product => (
            <div key={product.id} style={{ ...getCardStyle(product.quantity), borderRadius: "20px", padding: "20px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "50%", marginBottom: "15px", border: "3px solid rgba(133,88,111,0.3)" }}
              />
              <h2 style={{ margin: "10px 0", fontSize: "22px" }}>{product.name}</h2>
              {product.category && <p style={{ fontSize: "14px", margin: "5px 0", fontStyle: "italic" }}>{product.category}</p>}
              <p style={{ margin: "5px 0", fontWeight: "bold" }}>Price: M {product.price.toFixed(2)}</p>
              <p style={{ margin: "5px 0", fontWeight: "bold" }}>Quantity: {product.quantity}</p>
              <span style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "6px 12px",
                borderRadius: "12px",
                fontWeight: "bold",
                backgroundColor: product.quantity === 0 ? "#ff4c4c" : product.quantity <= 5 ? "#f7b500" : "#85586F",
                color: product.quantity <= 5 ? "#333" : "#fff"
              }}>
                {checkStockStatus(product.quantity)}
              </span>

              <input
                type="number"
                min="1"
                placeholder="Qty to sell"
                value={quantitiesToSell[product.id] || ""}
                onChange={e => handleQuantityChange(product.id, e.target.value)}
                disabled={product.quantity === 0}
                style={{ marginTop: "10px", width: "80px", padding: "5px", borderRadius: "6px", border: "1px solid #85586F" }}
              />
              <button
                onClick={() => sellProduct(product)}
                disabled={product.quantity === 0}
                style={{ marginTop: "10px", padding: "8px 15px", borderRadius: "8px", backgroundColor: "#85586F", color: "#fff", border: "none", cursor: "pointer" }}
              >
                Sell
              </button>

              <p style={{ marginTop: "10px", fontSize: "14px", fontWeight: "bold", color: "#333" }}>Total Value: M {totalValue(product).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            width: "100%",
            height: "4px",
            margin: "40px 0",
            borderRadius: "2px",
            background: "linear-gradient(90deg, #85586F, #F7B500, #85586F)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
          }}
        />

        <h2 style={{ color: "#85586F", textAlign: "center" }}>Sales History</h2>
        {salesHistory.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Price (M)</th>
              </tr>
            </thead>
            <tbody>
              {salesHistory.map(sale => (
                <tr key={sale.id} style={{ textAlign: "center", backgroundColor: "#fff3d6" }}>
                  <td>{sale.date}</td>
                  <td>{sale.productName}</td>
                  <td>{sale.quantity}</td>
                  <td>M {sale.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p style={{ textAlign: "center", marginTop: "10px" }}>No sales recorded yet.</p>}
      </div>
    </div>
  );
}

export default Sales;
