/* eslint-disable no-useless-concat */
/* eslint-disable no-template-curly-in-string */
import React, {Component} from 'react';
import{Button} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import MainFooter from '../components/footer/footer';
import AppNavbar from '../components/navbar/AppNavbar';
import "../assets/css/application.css";
import axios from 'axios';
import Modal from 'react-modal';
import ConerstoneViewport from 'react-cornerstone-viewport';
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';

import Hammer from "hammerjs";

const BASE_URL = 'http://localhost:5000/';
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.init();
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

cornerstoneWADOImageLoader.webWorkerManager.initialize({
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: true,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        usePDFJS: false,
        strict: false,
      },
    },
  });

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Images:[],
            imageUrl:[],
            label: [],
            labelID: '',
            labelName: '',
            modalIsOpen: false,
            tools: [
                {name: 'Wwwc',
                 mode: 'active',
                 modeOptions: { mouseButtonMask:1},
                },
                {
                    name:'Zoom',
                    mode: 'active',
                    modeOptions:{mouseButtonMask: 2},
                },
                {
                    name: 'Pan',
                    mode: 'active',
                    modeOptions: {mouseButtonMask: 4},
                },
                {name:'StackScrollMouseWheel', mode:'active'},
                {name: 'PanMultiTouch', mode:'active'},
                {name: 'ZoomTouchPinch', mode: 'active'},
                {name:'StackScrollMultiTouch', mode: 'active'},
            ],
            imageIds: [
                'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.9.dcm',
                'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.10.dcm',
                'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
                'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm',
                // 'D:/DICOM/TCGA-LUSC/TCGA-34-2605/08-10-1989-CT CHEST-64467/1.000000-scout-93446/1.1.dcm'
              ],
        }
    };
    componentDidMount(){
        axios.get('/api/label')
        .then(result =>{
            const label = result.data.label
             this.setState({label})
            }).catch(error => console.log(error));
    };
    
    handleChange = e =>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value,
        });
    };
    selectImage = e =>{
        let Images = [];
        for (var i = 0; i < e.target.files.length; i++) {
            Images[i] = e.target.files.item(i);
        }
        Images = Images.filter(image => image.name.match(/\.(jpg|dcm)$/));
        this.setState({Images})
    }
    handleUploadImage = e => {
        e.stopPropagation();
        e.preventDefault();
        const uploaders = this.state.Images.map(image =>{
            const data = new FormData();
            data.append("image", image, image.name);
            return axios.post(BASE_URL + 'api/insertImg', data).then(response => {
                this.setState({imageUrl: [response.data.imageUrls, ...this.state.imageUrl]});
            })
        });

        axios.all(uploaders).then(() => {
            cornerstone.loadImage(this.state.imageUrl).then(image=>{
                console.log(image);
            })
            console.log('Upload complete')
        }).catch(err => console.error(err))
    }
    handleUpload = e =>{
        e.preventDefault();

        const newLabel = {
            labelID: '',
            labelName: this.state.labelName,
        };
        axios.post('/api/insert', newLabel).then(res => {
            let label = this.state.label;
        label = [newLabel,...label];
        this.setState({label: label});
        }).catch(error => console.log(error));
    };
    componentWillMount() {
        Modal.setAppElement('body');
    };
    openModal = () => {
        this.setState({
            modalIsOpen: true,
        });
    };
    closeModal = ()=> {
        this.setState({
            modalIsOpen: false
        });
    };
    handleEdit = (e)=> {
        e.preventDefault();
        let key = this.state.labelID;
        this.setState(prevState => ({
            image : prevState.image.map(
                element => element.labelID === key ? {
                    ...element,
                    labelName: this.state.labelName
                } : element
            )
        }))
    }

    render() {
        // let $labelList = ( <div className="EmptyLabelList">
        // <h1><i className="fa fa-folder-open"></i></h1>
        // <p><b>Your Label list is empty</b></p>
        
        // <hr/>
        // </div>
        // );
        // if(this.state.labelName){
        //     $labelList = (
                
               
        //         )
        // }

        return(
            <>
            <div className="Application">
             <AppNavbar/>
             <div className="EditorContainer">
                     <div className="SideNavbar left with-context">
                     <div className="CompanionBar">
        <Button className="imgbutton" color="info"><i className="fa fa-image"/>Images </Button>
                     </div>
                     <div className="SideNavContent">
                         <div className="ImageList" style={{alignSelf: "stretch",flex:"1"}}>
                             <div className="VirtualList">
                                 <div style={{postion: "relative", overflow: "hidden", width: "100%", height: "100%"}}>
                                     <div style={{position: "absolute",top: "0px", left: "0px",right: "0px",bottom: "0px",overflow: "hidden", marginRight: "-17px",marginBottom:"-17px"}}>
                                     <div className="VirtualListContent">
                                         
                                     
                                         {
                                             this.state.imageUrl.map((url , i)=> (
                                                <div className="ImgPreview selected" >
                                                <div className="Foreground" style={{width: '100%', height: '100%'}}>
                                                <img className="Image" key={i} src={BASE_URL + url} alt="img" style={{left:'0', top:'0'}}/>
                                                 </div>
                                                 </div>
                                         )) 
                                         
                                        }
                                        
                                        
                                        </div>
                                    </div>
                                     <div style={{position: "absolute",height: "6px",transition: "opacity 200ms ease 0s" , opacity:"0",right: "2px",bottom:'2px',left: "2px",borderRadius: "3px"}}>
                                    <div style={{position:"relative",display:"block",height: "100%",cursor: "pointer", borderRadius: "inherit", backgroundColor: "rgba(0,0,0,0.2)",width:"0px"}}></div>
                                </div>
                                <div style={{position:"absolute",width:"6px",transition: "opacity 200ms ease 0s",opacity:"0",right: "2px",bottom:"2px",top:"2px",borderRadius: "3px"}}>
                                    <div style={{position:"relative",display:"block",width: "100%",cursor: "pointer", borderRadius:"inherit",backgroundColor:"rgba(0,0,0,0.2)",height:"0px",}}></div>
                                </div>
                                 </div>
                                </div>
                         </div>
                     </div>
                    </div>
                    <div className="MainEditor">
                        <div className="Editor" draggable="false">
                         <div style={{position:"relative", overflow:"hidden",width: "100%",height:"100%"}}>
                            <div style={{position:"absolute", top:"0px", left:"0px",right:"0px",bottom:'0px',overflow:"scroll",marginRight:"-17px",marginBottom:"-17px"}}>
                            </div>
                                <div className="track-horizontal">
                                    <div style={{position:'relative',display:"block",height:"100%",cursor:'pointer',borderRadius:'inherit',backgroundColor:'rgba(0,0,0,0.2)',width:'0px'}}></div>
                                </div>
                                <div className="track-vertical">
                                    <div style={{position:'relative',display:"block",height:"100%",cursor:'pointer',borderRadius:'inherit',backgroundColor:'rgba(0,0,0,0.2)',width:'0px'}}></div>
                                </div>
                                <ConerstoneViewport 
                                    tools = {this.state.tools}
                                    imageIds={this.state.imageIds}
                                    style={{height:'512px',flex:'1'}} />
                                <img src = {this.state.imageUrl} alt='alo'/>
                            </div>
                            <div className="MousePos" style={{display:"none"}}></div>
                            <div className="Cursor" draggable="false" style={{display:'none',left:'12px',top:'136px',}}>
                                <img draggable="false" alt="indicator"></img>
                            </div>
                        </div>
                        <input type='file' multiple className='form-control' onChange={this.selectImage}></input>
                    <Button size="lg" onClick={this.handleUploadImage} color='info' >Upload</Button>
                        </div>

                    
                    <div className="SideNavbar right">
                    <div className="CompanionBar">
                     <Button className="labelbutton" color = "info"><i className="fa fa-tags"/>Labels</Button>
                     </div>
                     <div className="SideNavContent">
                        <div className="LabelTool">
                            <div class="HeaderTool active" style={{height:'40px'}}>
                                <div class="Marker"></div>
                                <div className="HeaderGroup">
                               <i className="fa fa-tags Icon"/><b>Label List</b>
                                </div>
                            </div>
                            <div className="LabelContent active" style={{height:'680px'}}>
                                <div className="LabelList" style={{height:'611px',width:'280px'}}>
                                    <div style={{height:'100%',width:'100%',position:'relative',overflow:'hidden'}}>
                                        <div style={{position:'absolute', top:'0px', left:'0px', right:'0px',bottom:'0px',overflow:'scroll',marginRight:'-17px',marginBottom:'-17px'}}>
                                       <div className="LabelListContent">
                                       <div className="LabelField" style={{width:'280px', height:'40px'}}>
                                           <div className="LabelFieldWrapper">
                                               <div className="Content">
                                                   <div className="ContentWrapper">
                                                   <FormControl style={{ width:'250px'}}>
                                            <InputLabel className='text-white' id='demo-simple-select-label' type='select'>Label</InputLabel>
                                             <Select value={this.state.labelName}
                                             labelID='demo-simple-select-label'
                                             id='demo-simple-select'
                                                onChange={this.handleChange}>
                                                {this.state.label.map(label => (
                                                <MenuItem key={label.labelID} value={label.labelID}>{label.labelName}</MenuItem>
                                            ))}
                                    
                                             </Select>
                                        </FormControl> 
                                                   </div>
                                               
                                               </div>
                                            </div>
                                </div>
                                <Button color='info' onClick={() => this.openModal()}>Create Label</Button>
                                       </div>
                                        </div>
                                    </div>
                               
                                </div>
                            </div>
                        </div>
                         </div>
                    </div>
                    <Modal
                    isOpen ={this.state.modalIsOpen}
                    onRequestClose ={this.closeModal}>
                        <Button onClick={this.closeModal}>Close</Button>
                        <form onSubmit={this.handleUpload}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Label</th>
                                        <td>
                                            <input type="text" name="labelName" onChange={this.handleChange} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Button type="submit">Create</Button>
                        </form>
                    </Modal>
                    </div>
                     <MainFooter/>
                    </div>
              </>
        );
}
}
export default Application

