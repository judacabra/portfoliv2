import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Línea del tiempo <span>y</span>
          <br /> experiencia
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4> Practicante de desarrollo </h4>
                <h5> Auge Total S.A.S </h5>
              </div>
              <h3> 2022 </h3>
            </div>
            <p>
              Primeramente agradezco a la empresa por darme la oportunidad.
              Allí fuí practicante de desarrollo por seis meses y aprendí a programar en entorno de desarrollo real 
              y mis primeras experiencias con un entorno de producción.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4> Auxiliar de desarrollo </h4>
                <h5> Auge Total S.A.S </h5>
              </div>
              <h3> 2022 </h3>
            </div>
            <p>
              Por mi buen desempeño durante mi etapa de practicante, la empresa decidio contratarme como auxiliar de desarrollo, 
              cargo que ocupe seis meses.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4> Desarrollador de sofware </h4>
                <h5> Auge Total S.A.S </h5>
              </div>
              <h3> 2023 </h3>
            </div>
            <p>
              Luego de un año en la compañia, deciden que estoy listo para asumir el reto de ser desarrollador, 
              encargado de proyectos de clientes especificos.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4> Desarrollador y líder de soporte </h4>
                <h5> SD Software S.A.S </h5>
              </div>
              <h3> 2024 </h3>
            </div>
            <p>
              Fue una experiencia un poco diferente, debido a mi experiencia previa, mi cargo de desarrollador de software
              aquí vendría de la mano de ser el líder del soporte, por mi eficacía para la canalización y resolución de conflictos.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4> Desarrollador de software </h4>
                <h5> Play Technologies S.A.S </h5>
              </div>
              <h3> AHORA </h3>
            </div>
            <p>
              Desde el 2024 hasta hoy, soy desarrollador de software en Play Technologies del grupo PLAY GROUP siendo encargado 
              de Octoplus (proyecto de gestión de Carwash) y participando en otros proyectos de la compañia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
