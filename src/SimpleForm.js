import React from "react";
import Greetings from "./Calc";
import {Button} from "./buttons/Button";


class SimpleForm extends React.Component {
  state = {
    firstName: "",
    firstNameError: "",
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
        <div>
          <label>
            First name:
            <input
              type="text"
              name="firstName"
              onChange={this.onFirstNameChange}
              onBlur={this.onFirstNameBlur}
            />
            {firstNameError && <div style={{color: 'red', margin: 5}}>{firstNameError}</div>}
          </label>
        </div>

        <Button
        child="button text"
        buttonSize="btn--medium"
        buttonStyle="btn--primary--solid"
        onClick={this.onButtonClick}
        />

        {this.state.clicked?<Greetings firstName={firstName}/>:null}
      </div>
    );
  }
}

export default SimpleForm;