import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/bootstrap.min.css';
import "./assets/css/now-ui-kit.css";
import "./assets/demo/demo.css";
import Application from './page/application';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
         <Application/>,
     document.getElementById('root')
);

serviceWorker.unregister();
