import "./../css/App.css";

function Footer() {
  return (
    <>
      <br></br>
      {/* <!-- Footer --> */}
      <footer className="text-center text-lg-start bg-body-tertiary text-muted">
        {/* <!-- Section: Social media --> */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* <!-- Left --> */}
          <div className="me-5 d-none d-lg-block fw-bold footer">
            <span>More about the team:</span>
          </div>
        </section>

        {/* <!-- Section: Links  --> */}
        <section className="footer">
          <div className="container text-center text-md-start mt-5">
            {/* <!-- Grid row --> */}
            <div className="row mt-3">
              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* <!-- Content --> */}
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>🍏 CoopCart
                </h6>
                <p>
                  CoopCart is a platform designed to streamline the grocery
                  order process for those living in housing cooperatives. We are
                  dedicated to supporting the nourishment and thriving of
                  healthy communities and ecosystems.
                </p>
              </div>

              {/* <!-- Grid column --> */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Tech Stack</h6>
                <p className="text-reset">⚡ FastAPI</p>
                <p className="text-reset">⚛️ React-Redux</p>
                <p className="text-reset">🐘 PostgreSQL</p>
                <p className="text-reset">
                  <i className="bi bi-bootstrap-fill"></i> Bootstrap
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">👨‍💻 Creators</h6>
                <p>
                  <i className="fas fa-home"></i>Victoria Chiang
                </p>
                <p>
                  <i className="fas fa-home"></i>Malek Byam
                </p>
                <p>
                  <i className="fas fa-home"></i>Joshua Yu
                </p>
                <p>
                  <i className="fas fa-home"></i>Sherryanne Shen
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Contact Us!</h6>
                <p>
                  <a
                    href="https://www.linkedin.com/in/victoriachiang/"
                    className="fas fa-home me-3"
                  >
                    Victoria's LinkedIn
                  </a>{" "}
                  <i className="bi bi-linkedin"></i>
                </p>
                <p>
                  <a
                    href="https://www.linkedin.com/in/malek-byam-673674171/"
                    className="fas fa-home me-3"
                  >
                    Malek's LinkedIn
                  </a>{" "}
                  <i className="bi bi-linkedin"></i>
                </p>
                <p>
                  <a
                    href="https://www.linkedin.com/in/joshuayu-dev/"
                    className="fas fa-home me-3"
                  >
                    Joshua's LinkedIn
                  </a>{" "}
                  <i className="bi bi-linkedin"></i>
                </p>
                <p>
                  <a
                    href="https://www.linkedin.com/in/sherryanne-shen/"
                    className="fas fa-home me-3"
                  >
                    Sherryanne's LinkedIn
                  </a>{" "}
                  <i className="bi bi-linkedin"></i>
                </p>
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!-- Grid row --> */}
          </div>
        </section>

        <div className="text-center p-4">
          <a href="https://github.com/vchiang18/coopcart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-gitlab"
              viewBox="0 0 16 16"
            >
              <path d="m15.734 6.1-.022-.058L13.534.358a.57.57 0 0 0-.563-.356.6.6 0 0 0-.328.122.6.6 0 0 0-.193.294l-1.47 4.499H5.025l-1.47-4.5A.572.572 0 0 0 2.47.358L.289 6.04l-.022.057A4.044 4.044 0 0 0 1.61 10.77l.007.006.02.014 3.318 2.485 1.64 1.242 1 .755a.67.67 0 0 0 .814 0l1-.755 1.64-1.242 3.338-2.5.009-.007a4.05 4.05 0 0 0 1.34-4.668Z" />
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
