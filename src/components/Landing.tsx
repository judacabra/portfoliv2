import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hola! soy</h2>
            <h1>
              Julián
              <br />
              <span> Caicedo </span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Un creativo</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Diseñador web</div>
              <div className="landing-h2-2">Desarrollador</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Desarrollador</div>
              <div className="landing-h2-info-1">Diseñador web</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
