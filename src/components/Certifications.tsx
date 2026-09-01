import "./styles/Certifications.css";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Award, CheckCircle2 } from "lucide-react";

const certifications = [
  { name: "React Advanced Patterns",            issuer: "Frontend Masters",    date: "2022", accent: "#6366f1" },
  { name: "AWS Certified Solutions Architect",  issuer: "Amazon Web Services", date: "2022", accent: "#f59e0b" },
  { name: "Google Cloud Professional Developer",issuer: "Google Cloud",        date: "2023", accent: "#4285F4" },
  { name: "Professional Scrum Master I",        issuer: "Scrum.org",           date: "2023", accent: "#8b5cf6" },
  { name: "Certified Kubernetes Administrator", issuer: "The Linux Foundation",date: "2024", accent: "#e98d58" },
  { name: "Meta Front-End Developer",           issuer: "Meta",                date: "2025", accent: "#0081FB" },
];

const Certifications = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
  }, []);

  return (
    <div className="certifications">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 20, marginBottom: 20, }}>
        <Award className="size-7" style={{ color: "#f59e0b", marginRight: 10, }} aria-hidden="true" />
        <h1 style={{ color: isDark ? "#ffffff" : "#111827", margin: 0, fontSize: 40, }}>
          Certificaciones
        </h1>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            whileHover={{ y: -5, transition: { type: "spring", stiffness: 400 } }}
          >
            <div
              className="rounded-xl p-5 border h-full"
              style={{
                ...(isDark 
                  ? { 
                      borderColor: "rgba(255,255,255,0.1)", 
                      backdropFilter: "blur(8px)", 
                      transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s" 
                    }
                  : { 
                      borderColor: "rgba(0,0,0,0.08)", 
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)", 
                      transition: "border-color 0.3s, box-shadow 0.3s" 
                    }
                ),
                background: isHovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.07)",
                borderRadius: 15,
                padding: 20,
                paddingTop: 20,
                paddingBottom: 5,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = `${cert.accent}55`;
                el.style.boxShadow = `0 4px 24px ${cert.accent}18`;
                setIsHovered(true);
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
                el.style.boxShadow = isDark ? "none" : "0 2px 12px rgba(0,0,0,0.04)";
                setIsHovered(false);
              }}
            >
              <div style={{ display: "flex", justifyContent: "start", }}>
                <CheckCircle2 className="size-5 shrink-0" style={{ marginRight: 3, color: cert.accent }} aria-hidden="true" />
                <span
                  style={{ background: `${cert.accent}18`, color: cert.accent, paddingTop: 2, paddingBottom: 2, paddingLeft: 7, paddingRight: 7, borderRadius: 10, }}
                >
                  {cert.date}
                </span>
              </div>
              <h3 style={{ marginTop: 10, marginBottom: -5, color: isDark ? "#f1f5f9" : "#111827" }}>
                {cert.name}
              </h3>
              <p className="text-xs" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>
                {cert.issuer}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Certifications;