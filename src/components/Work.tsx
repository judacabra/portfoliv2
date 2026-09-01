import "./styles/Work.css";

import gsap from "gsap";
import WorkImage from "./WorkImage";

import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Work = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const container = section.querySelector<HTMLElement>(".work-container");
      const track = section.querySelector<HTMLElement>(".work-flex");
      const title = section.querySelector<HTMLElement>(".section-container");

      if (!container || !track || !title) return;

      if (window.matchMedia("(max-width: 768px)").matches) return;

      const getDistance = () => {
        const containerWidth = container.getBoundingClientRect().width;
        const trackWidth = track.scrollWidth;

        return Math.max(0, trackWidth - containerWidth);
      };

      const animation = gsap.to(section, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: title,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: section,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="work-section"
      id="work"
    >
      <div className="work-container section-container">
        <div className="work-heading">
          <h2 className="work-heading-title">
            Mis <span>proyectos</span>
          </h2>
          <p className="work-heading-subtitle">
            Algunos de los proyectos en los que he trabajado.
          </p>
        </div>

        <div className="work-viewport">
          <div className="work-flex">
            {[...Array(6)].map((_, index) => (
              <article className="work-box" key={index}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>
                      {String(index + 1).padStart(2, "0")}
                    </h3>

                    <div>
                      <h4>Project Name</h4>
                      <p>Category</p>
                    </div>
                  </div>

                  <div className="work-tools">
                    <h4>Tools and features</h4>

                    <p>
                      Javascript, TypeScript, React, Threejs
                    </p>
                  </div>
                </div>

                <WorkImage
                  image="/images/placeholder.webp"
                  alt={`Proyecto ${index + 1}`}
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
