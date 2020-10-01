import React from 'react';
import {Container} from "reactstrap";

function MainHeader(){
    let pageHeader = React.createRef();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
        if (window.innerWidth > 1000) {
          const updateScroll = () => {
            let windowScrollTop = window.pageYOffset / 3;
            pageHeader.current.style.transform =
              "translate3d(0," + windowScrollTop + "px,0)";
          };
          window.addEventListener("scroll", updateScroll);
          return function cleanup() {
            window.removeEventListener("scroll", updateScroll);
          };
        }
      });
    
      return (
        <>
          <div className="page-header clear-filter" filter-color="blue">
            <div
              className="page-header-image"
              style={{
                backgroundImage: "url(" + require("../../assets/img/header.jpg") + ")",
              }}
              ref={pageHeader}></div>
            <Container>
                <div className="context-center brand">
                    <img alt="header" className="logo" src={require("../../assets/img/logo.png")}></img>
                    <h2 className="h2-seo">Medical Images Segmentation </h2>
                </div>
            </Container>
           
          </div>
        </>
    );
}
export default MainHeader;