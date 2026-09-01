import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";

import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import Certifications from "./Certifications";
import Footer from "./Footer";

const TechStack = lazy(() => import("./TechStack"));
const TechStackDesktop = lazy(() => import("./TechStackDesktop"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(window.innerWidth > 1024);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    
    resizeHandler();

    window.addEventListener("resize", resizeHandler);
    
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />

      {isDesktopView && children}
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <TechStack />
            {isDesktopView && (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStackDesktop />
              </Suspense>
            )}
            <Certifications />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
