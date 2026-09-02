import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO" id="whatido">
      <div className="what-box">
        <h2 className="title" style={{ zIndex: 10, marginLeft: -150, }}>
          MI <br /> 
          <span className="do-h2"> PERFIL </span>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>Desarrollador</h3>
              <h4>Descripción</h4>
              <p>
                Combino solidez técnica en frontend y backend con una mentalidad centrada en el diseño y la experiencia de usuario. 
              </p>
              <h5> Habilidades y herramientas </h5>
              <div className="what-content-flex">
                <div className="what-tags"> JavaScript </div>
                <div className="what-tags"> TypeScript </div>
                <div className="what-tags"> Java </div>
                <div className="what-tags"> React </div>
                <div className="what-tags"> Python </div>
                <div className="what-tags"> Node  </div>
                <div className="what-tags"> Next.js </div>
                <div className="what-tags"> Express.js </div>
                <div className="what-tags"> PHP </div>
                <div className="what-tags"> MySql </div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>Diseñador web</h3>
              <h4>Descripción</h4>
              <p>
                Me apasiona crear interfaces que no solo funcionen bien, sino que se sientan únicas. 
              </p>
              <h5> Habilidades y herramientas </h5>
              <div className="what-content-flex">
                <div className="what-tags"> Blender </div>
                <div className="what-tags"> Figma </div>
                <div className="what-tags"> UX / UI Design </div>
                <div className="what-tags"> Motion </div>
                <div className="what-tags"> 3D Animation </div>
                <div className="what-tags"> Character Design </div>
                <div className="what-tags"> Open design </div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
