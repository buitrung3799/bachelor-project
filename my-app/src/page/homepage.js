import React from "react";
import{
    Button,
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardText,
    Jumbotron
} from "reactstrap";
import "./homepage.css"
import history from '../history'
import ExamplesFooter from '../components/footer/footer';
import ExamplesNavbar from '../components/navbar/navbar';
import MainHeader from '../components/header/header';
function HomePage(){
    React.useEffect(() => {
        document.body.classList.add("home-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0,0);
        document.body.scrollTop = 0;
        return function cleanup(){
            document.body.classList.remove("home-page");
            document.body.classList.remove("sidebar-collapse");
        };
    },[]);
    return(
        <>
            <ExamplesNavbar/>
            <div className="wrapper">
                <MainHeader />
                <div className="section section-about-us">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="8">
                                <h2 className="title">Medical Images Segmentation</h2>
                                <hr className="small" style={{backgroundColor:"skyblue"}}/>
                                <h5 className="description">Its a web-based data labeling application for the medical images</h5>
                            </Col>
                        </Row>
                        <div className="separator separator-primary">
                        </div>
                        <div className="section-story-overview">
                            <Row>
                                <Col md="6">
                                    <div className="image-container image-left"
                                    style={{backgroundImage: "url(" + require("../assets/img/bg1.jpg")}}></div>
                                </Col>
                                <Col md="5">
                                    <div className="image-container image-right" 
                                    style={{backgroundImage: "url(" + require("../assets/img/bg2.jpg")+")",}}></div>
                                </Col>
                            </Row>
                        </div>
                        <h2 className="title text-center">Why COVID segement ?</h2>
                        <hr style={{backgroundColor: "skyblue"}}/>
                        <h4 className="text-center">MedSeg allows free and simple volume segmentation of organs, tissue and pathologies in 
radiological images. You can segment the images manually</h4>
                        <Row>
                            <Col xs="3" md="4">
                                <img className="rounded-circle" src={require("../assets/img/web_application.png")} alt="webapp" style={{width:230 , height:230}}></img>
                                <h3 className="text-center title">Web-based</h3>
                                <h5 className="text-center">No installation needed.Run locally, so patient data does not need to leave the computer</h5>
                            </Col>
                            <Col xs="3" md="4" >
                                <img className="rounded-circle" src={require("../assets/img/userfriendly.png")} alt="webapp" style={{width:230 , height:230}}></img>
                                <h3 className="text-center title">User-friendly</h3>
                                <h5 className="text-center">Easy-to-use tool for segmentation of radiology images with modern AI-based segmentation algorithms</h5>
                            </Col>
                            <Col xs="3" md="4">
                                <img className="rounded-circle" src={require("../assets/img/fast.png")} alt="webapp" style={{width:230 , height:230}}></img>
                                <h3 className="text-center title">Fast</h3>
                                <h5 className="text-center">Written in JavaScript for speed optimization</h5> 
                            </Col>
                        </Row> 
                        <h2 className="text-center title">How it works ?</h2>
                        <hr style={{backgroundColor:"skyblue"}} />
                        <h4 className="text-center">Let's see how this application work</h4>
                        <Row>
                        <Col md="4">
                        <Card>
                            <CardImg top width="100%" alt="upload" src={require("../assets/img/upload.png")}></CardImg> 
                            <CardBody>
                            <CardText>
                            <h3>Step 1</h3>
                            <h4>Uploads your images into the web</h4>
                            </CardText>
                            </CardBody>
                        </Card>
                        </Col>

                        <Col md="4">
                        <Card>
                            <CardImg top width="100%" alt="process" src={require("../assets/img/process.png")}></CardImg> 
                            <CardBody>
                            <CardText>
                            <h3>Step 2</h3>
                            <h4>Choose the area you want</h4>
                            </CardText>
                            </CardBody>
                        </Card>
                        </Col>
                        <Col md="4">
                        <Card>
                            <CardImg top width="100%" alt="process" src={require("../assets/img/label.png")}></CardImg> 
                            <CardBody>
                            <CardText>
                            <h3>Step 3</h3>
                            <h4>Put the label on the image</h4>
                            </CardText>
                            </CardBody>
                        </Card>
                        </Col>
                        </Row>
                    </Container>
                    <br/>
                    <div>
                        <Jumbotron className="jumbo-image shadow" style={{backgroundImage: "url(" + require("../assets/img/jumbo.jpg")+")",}}>
                        
                            <Container fluid className="text-center jumbotext">
                                <h2 className="display-3">Launch the app</h2>
                                <h4>Click the below button and go to the app</h4>
                                
                               <Button className="btn-round" color="info" size="lg" onClick={() => history.push('/Application')}>Get Started</Button>
                            </Container>
                        </Jumbotron>
                        
                    </div>
                </div>
                <ExamplesFooter/>
            </div>
        </>
    );
}
export default HomePage;