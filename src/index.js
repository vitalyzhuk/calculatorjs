import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import './CalculatorApp.css';

import CalculatorApp from "./CalculatorApp";

ReactDOM.render(
  <React.StrictMode>
    <div className="CalculatorApp">

      <CalculatorApp/>

    </div>
  </React.StrictMode>,
  document.getElementById('root')
);


