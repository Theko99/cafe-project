import React from "react";

function Footer() {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#85586F",
        color: "#fff",
        textAlign: "center",
        padding: "15px 0",
        fontWeight: "bold",
        boxShadow: "0 -5px 15px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      Wings Café © 2025
    </footer>
  );
}

export default Footer;
