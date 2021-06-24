import React from "react";
import './CalculatorApp.css';


import {TextFrame} from "./TextFrame"
import {ButtonFrame} from "./buttons/ButtonFrame";


class CalculatorApp extends React.Component {
  state = {
    first: "0",
    second: "",
    operator: "",
    square: false,
    result: ""
  };

  onButtonClick = event => {
    var state = this.getStateHandler();
    if (state.operator === "") {
        if (state.first==="0") state.first = event.target.innerText;
        else {
            if (state.first==="-0") state.first = "-" + event.target.innerText;
            else state.first = state.first + event.target.innerText;
        }

    } else state.second = state.second + event.target.innerText;

    this.setState(state);
  };

  onCommonOperationClick = event => {
    var state = this.getStateHandler();

    if (state.second !== "") return;

    state.operator = event.target.innerText;
    this.setState(state);
  };

  onUndoClick = () => {
    var state = this.getStateHandler();

    if (state.first === "0") return;

    if (state.second !== "") state.second = state.second.slice(0, -1);
    else {
        if (state.operator !== "") state.operator = "";
        else {
            let first = state.first.slice(0, -1);
            if (first === "-" || first === "") first = first + "0";
            state.first = first;
        }
    }

    this.setState(state);
  };

  onClearClick = () => {
    this.setState({
      first: "0",
      second: "",
      operator: "",
      square: false,
      result: ""
    });
  };

  onSquareClick = () => {
    var state = this.getStateHandler();
    state.square = true;

    this.calculate(state);
  };

  onInvertClick = () => {
    var state = this.getStateHandler();

    let first = state.first;

    if (first[0] === "-") first = first.slice(1);
    else first = "-" + first;

    state.first = first;
    this.setState(state);
  };

  onQuoteClick = () => {
    var state = this.getStateHandler();

    let second = state.second;
    if (second !== "") {
        if (second.indexOf(".") !== -1) return;
        state.second = second + ".";
    } else {
        if (this.state.operator !== "") return;

        let first = state.first;
        if (first.indexOf(".") !== -1) return;
        state.first = first + ".";
    }

    this.setState(state);
  };

  makeOutput = state => {
    if (state.result !== "") return state.result;
    let output = state.first;

    if ( (!(state.operator === "")) || (!state.square) )
        output = output + " " + state.operator + " " + state.second;

    if (state.square) return "( " + output + " )^2"
    return output;
  };

  onResultClick = () => {
    this.calculate(this.getStateHandler());
  };

  getStateHandler = () => {
    var state = this.state;
    if (state.result !== "") {
        state.first = "0";
        state.second = "";
        state.operator = "";
        state.square = false;
        state.result = "";
    }
    return state;
  };

 calculate = actualState => {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(actualState)
    };

    fetch("http://localhost:8080/calculate", requestOptions)
       .then(response=>response.json())
       .then(
          (response)=>{this.setState({
                            result: response.historicalOutput,
                            first: actualState.first ,
                            second: actualState.second ,
                            operator: actualState.operator ,
                            square: actualState.square
                            });},
          (error)=>{this.setState({
                            result: error.message,
                            first: actualState.first ,
                            second: actualState.second ,
                            operator: actualState.operator ,
                            square: actualState.square
                            });}
          );
  };


  render() {
    let output = this.makeOutput(this.state);

    return (
    <React.Fragment>
      <TextFrame text={output} />

      <div className="CalculatorApp-content">
        <ButtonFrame
                text1="*"
                text2="x^2"
                text3="Clear"
                text4="<="
                style1="btn--operations"
                style2="btn--operations"
                style3="btn--operations"
                style4="btn--operations"
                defaultOnClick={this.onButtonClick}
                onClick1={this.onCommonOperationClick}
                onClick2={this.onSquareClick}
                onClick3={this.onClearClick}
                onClick4={this.onUndoClick}
                />

        <ButtonFrame
                text1="7"
                text2="8"
                text3="9"
                text4="/"
                style4="btn--operations"
                defaultOnClick={this.onButtonClick}
                onClick4={this.onCommonOperationClick}
                />

        <ButtonFrame
                text1="4"
                text2="5"
                text3="6"
                text4="-"
                style4="btn--operations"
                defaultOnClick={this.onButtonClick}
                onClick4={this.onCommonOperationClick}
                />

        <ButtonFrame
                text1="1"
                text2="2"
                text3="3"
                text4="+"
                style4="btn--operations"
                defaultOnClick={this.onButtonClick}
                onClick4={this.onCommonOperationClick}
                />

        <ButtonFrame
                text1="+/-"
                text2="0"
                text3=","
                text4="="
                style1="btn--operations"
                style3="btn--operations"
                style4="btn--equals"
                defaultOnClick={this.onButtonClick}
                onClick1={this.onInvertClick}
                onClick3={this.onQuoteClick}
                onClick4={this.onResultClick}
                />
      </div>
    </React.Fragment>
    );
  }
}

export default CalculatorApp;