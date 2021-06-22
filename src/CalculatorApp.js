import React from "react";
import './CalculatorApp.css';


import {TextFrame} from "./TextFrame"
import {ButtonFrame} from "./buttons/ButtonFrame";


class CalculatorApp extends React.Component {
  state = {
    output: "",
    isCommonOperatorUsed: false,
  };

  onButtonClick = event => {
    this.setState({
      output: this.state.output + event.target.innerText
    });
  };

  onCommonOperationClick = event => {
    if (this.state.output === "") {
        return;
    } else {
        if (this.state.isCommonOperatorUsed){
            if (this.isOutputEndsCommonOperator()) {
                this.setState({
                  isCommonOperatorUsed: true,
                  output: this.clearLastOutput(3) + " " + event.target.innerText + " "
                });
            }

        } else {
            this.setState({
              isCommonOperatorUsed: true,
              output: this.state.output + " " + event.target.innerText + " "
            });
        }
    }
  };

  isOutputEndsCommonOperator = () => {
    return this.state.output.match(/.* [* / \- +] (?!\d)/g);
  };

  onUndoClick = () => {
    if (this.isOutputEndsCommonOperator()) {
        this.setState({
          isCommonOperatorUsed: false,
          output: this.clearLastOutput(3)
        });
    } else {
        this.setState({
          output: this.clearLastOutput(1)
        });
    }
  };

  clearLastOutput = num => {
    num = num?num:1;
    return this.state.output.slice(0, -num);
  };

  onClearClick = () => {
    this.setState({
      output: "",
      isCommonOperatorUsed: false
    });
  };

  onSquareClick = event => {


  };

  render() {
    const {output} = this.state;

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
                />
      </div>
    </React.Fragment>
    );
  }
}

export default CalculatorApp;