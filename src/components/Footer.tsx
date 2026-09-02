import { useEffect, useState } from "react";

const Footer = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(()=> {
    setIsDark(true);
  }, []);

  return (
    <footer
      className="py-8 text-center font-mono text-sm"
      role="contentinfo"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        background: "rgba(255, 255, 255, 0.07)",
        color: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.3)",
        transition: "background 0.45s, color 0.45s",
      }}
    >
      <span style={{ color: "#6366f1" }}> &lt; </span> &nbsp; Copyright &copy; 2026 Julián Caicedo — Cali, Colombia &nbsp;
      <span style={{ color: "#6366f1" }}> /&gt; </span>
    </footer>
  );
};

export default Footer;
