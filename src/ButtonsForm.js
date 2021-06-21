import React from "react";

import './ButtonsForm.css';

import {Button} from "./buttons/Button";
import {ButtonFrame} from "./buttons/ButtonFrame";


class ButtonsForm extends React.Component {
  state = {
    firstName: ""
  };

  validateName = name => {
    const regex = /[A-Za-z]{3,}/;

    return !regex.test(name)
      ? "The name must contain at least three letters. Numbers and special characters are not allowed."
      : "";
  };

  onFirstNameBlur = () => {
    const { firstName } = this.state;

    const firstNameError = this.validateName( firstName );

    return this.setState({ firstNameError });
  };

  onButtonClick = event => {
    this.setState({
          clicked: true,
          firstName: this.state.tmp
        });
  };
  onFirstNameChange = event => {
        this.setState({
          tmp: event.target.value
        });

    const { firstName } = this.state;
    const firstNameError = this.validateName( firstName );
    this.setState({ firstNameError });
  };

  render() {
    const {firstName, firstNameError, clicked, tmp} = this.state;

    return (
      <div>
        <ButtonFrame
                text1="*"
                text2="Square"
                text3="Clear"
                text4="<="
                />

        <ButtonFrame
                text1="7"
                text2="8"
                text3="9"
                text4="/"
                />

        <ButtonFrame
                text1="4"
                text2="5"
                text3="6"
                text4="-"
                />

        <ButtonFrame
                text1="1"
                text2="2"
                text3="3"
                text4="+"
                />

        <ButtonFrame
                text1="+/-"
                text2="0"
                text3="\,"
                text4="="
                />

        {this.state.clicked?<Greetings firstName={firstName}/>:null}
      </div>
    );
  }
}

export default ButtonsForm;