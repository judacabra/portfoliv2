import "./styles/Navbar.css";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";

import HoverLinks from "./HoverLinks";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export let smoother: ScrollSmoother;

const Navbar = ({isDesktopView = false}) => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;

      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
    
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
    
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/" className="navbar-title" data-cursor="disable">
          <img src="/images/jc-icon.png" alt="Logo" style={{ width: isDesktopView ? "100px" : "50px", }} />
        </a>
        <a
          href="mailto:example@mail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          jd_caicedo@hotmail.es
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="Sobre mí" />
            </a>
          </li>
          <li>
            <a data-href="#whatido" href="#whatido">
              <HoverLinks text="Perfíl" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="Proyectos" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="Contacto" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
