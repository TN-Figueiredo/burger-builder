import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";

import "./Auth.css";

class Auth extends Component {
  state = {
    controls: {
      email: this.createFormInput(
        "Mail Address",
        "input",
        { required: true, isEmail: true },
        "email"
      ),
      password: this.createFormInput(
        "Password",
        "input",
        { required: true, minLength: 6 },
        "password"
      )
    },
    isSignUp: true
  };

  createFormInput(
    placeholder,
    elType = "input",
    rules = { required: true },
    type = "text"
  ) {
    return {
      elementType: elType,
      elementConfig: {
        type: type,
        placeholder: placeholder
      },
      value: "",
      validation: rules,
      valid: false,
      touched: false
    };
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true; // This is here just in case I don't want to create a empty object for the select that doesn't require validation.
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    return (
      <div className="Auth">
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button 
        clicked={this.switchAuthModeHandler}
        btnType="Danger">
          SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}{" "}
        </Button>
      </div>
    );
  }
}

const mapDispatchToState = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  };
};

export default connect(
  mapDispatchToState,
  mapDispatchToProps
)(Auth);
