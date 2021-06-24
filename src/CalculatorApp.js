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
    if (this.state.operator === "") {
        if (this.state.first==="0") return this.setState({ first: event.target.innerText });
        if (this.state.first==="-0") return this.setState({ first: "-" + event.target.innerText });
        this.setState({ first: this.state.first + event.target.innerText });
    } else this.setState({ second: this.state.second + event.target.innerText });
  };

  onCommonOperationClick = event => {
    if (this.state.second !== "") return;

    this.setState({ operator: event.target.innerText });
  };

  onUndoClick = () => {
    if (this.state.first === "0") return;

    if (this.state.second !== "") {
        this.setState({ second: this.state.second.slice(0, -1) });
        return;
    }

    if (this.state.operator !== "") {
        this.setState({ operator: "" });
        return;
    }

    let first = this.state.first.slice(0, -1);
    if (first === "-" || first === "") first = first + "0";
    this.setState({ first: first });
  };

  onClearClick = () => {
    this.setState({
      first: "0",
      second: "",
      operator: "",
      square: false
    });
  };

  onSquareClick = () => {
    var actualState = this.state;
    actualState.square = true;

    this.calculate(actualState);
  };

  onInvertClick = () => {
    let first = this.state.first;

    if (first[0] === "-") first = first.slice(1);
    else first = "-" + first;

    this.setState({ first: first });
  };

  onQuoteClick = () => {
    let second = this.state.second;
    if (second !== "") {
        if (second.indexOf(",") !== -1) return;
        this.setState({ second: second + "," });
        return;
    }

    if (this.state.operator !== "") return;

    let first = this.state.first;
    if (first.indexOf(",") !== -1) return;
    this.setState({ first: first + "," });
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
    this.calculate(this.state);
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