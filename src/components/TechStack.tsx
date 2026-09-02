import "./styles/TechStack.css";

import { useEffect, useState, } from "react";
import { motion } from "motion/react";

const TechStack = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  const skillsData: any[] = [
    { skill: "React / Next.js", level: 97, category: "frontend" },
    { skill: "TypeScript", level: 95, category: "frontend" },
    { skill: "CSS / Tailwind", level: 93, category: "frontend" },
    { skill: "Motion / GSAP", level: 88, category: "frontend" },
    { skill: "Vue.js", level: 84, category: "frontend" },
    { skill: "Node.js", level: 80, category: "backend" },
    { skill: "PostgreSQL", level: 75, category: "backend" },
    { skill: "Python", level: 72, category: "backend" },
    { skill: "Docker / DevOps", level: 70, category: "backend" },
    { skill: "AWS", level: 65, category: "backend" },
  ];

  useEffect(()=> {
    setIsDark(true);
  }, []);

  return (
    <div className="techstack">
      <h3> Nivel de habilidades </h3>

      <div className="skills-grid">
        {skillsData.map((s) => {
          const isFront: boolean = s.category === "frontend";

          const color: string = isFront
            ? "#6366f1"
            : isDark
              ? "#475569"
              : "#94a3b8";

          const badgeBg: string = isFront
            ? "rgba(99,102,241,0.14)"
            : isDark
              ? "rgba(71,85,105,0.3)"
              : "rgba(148,163,184,0.2)";

          const label: string = isFront ? "Frontend" : "Backend";

          return (
            <div key={s.skill} className="skill-card">
              
              <div className="skill-header">
                <h4>{s.skill}</h4>

                <small
                  style={{
                    backgroundColor: badgeBg,
                    color: color,
                  }}
                >
                  {label}
                </small>
              </div>

              <div
                className="skill-bar"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "#f0f0f0",
                }}
              >
                <motion.div
                  className="skill-progress"
                  style={{
                    background: color,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                />
              </div>

              <div className="skill-percentage">
                <span
                  style={{
                    color: color,
                  }}
                >
                  {s.level}%
                </span>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default TechStack;
