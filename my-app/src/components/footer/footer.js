import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  href="index.html"
                >
                  COVID-19 Segmentation
                </a>
              </li>
              <li>
                <a
                  href="http://presentation.creative-tim.com?ref=nukr-default-footer"
                >
                  About Us
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Designed by{" "}
           
              Trung
            . Coded by{" "}
            
              Trung 
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
