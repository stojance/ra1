import React from "react";
import { Alert, Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import MyInput from './MyInput';

export default function MyForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [chseck_in, setCheck_in] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
  };

  const validateEmail = () => {
    var emailValid = false;
    if (email.length == 0) {
      setEmailError("Email is required");
    } else if (email.length < 6) {
      setEmailError("Email should be minimum 6 characters");
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email cannot contain spaces");
    } else {
      setEmailError("");
      emailValid = true;
    }

    return emailValid
  }

  const validatePassword = ()=> {
    var passwordValid = false;
    if (password.length == 0) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password should be minimum 6 characters");
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password cannot contain spaces");
    } else {
      setPasswordError("");
      passwordValid = true;
    }
    return passwordValid;
  }

  const validateFields = () => {
    const e = validateEmail();
    const p = validatePassword();

    return e && p;
  }

  const validateForm = () => {
    
    if (validateFields()) {
      alert("Email: " + email + "\nPassword: " + password);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <Form className="mt-1 pt-4" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            id = 'email'
            name="email"
            type="email"
            value={email}
            invalid={emailError !=='' ? true: undefined}
            onChange={(event) => {setEmail(event.target.value); validateEmail()}}
          />
          <FormFeedback invalid={emailError !=='' ? 'true': undefined}>{emailError}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password:</Label>
          <Input
            id='password'
            name="password"
            type="password"
            value={password}
            invalid={passwordError !==''? true: undefined}
            onChange={(event) => {setPassword(event.target.value); validatePassword()}}
          />
          <FormFeedback invalid={passwordError !==''? 'true': undefined}>{passwordError}</FormFeedback>
        </FormGroup>
        <MyInput 
            id='pwd' 
            type='password' 
            value={password} 
            invalid={passwordError}
            isFocused={true}
            onInputChange={(event) => {setPassword(event.target.value); validatePassword()}}>
          <strong>Password:</strong>
        </MyInput>
        <FormGroup check>
          <Label check></Label>
          <Input
            id='checkMe'
            name="checkMe"
            type="checkbox"
            checked={chseck_in}
            onChange={(event) => setCheck_in(event.target.checked)}
          />{" "}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setCheck_in(!chseck_in)}
          >
            Check me
          </span>
        </FormGroup>
        <FormGroup className="mt-2">
          <Button color='primary'>Submit</Button>
        </FormGroup>
      </Form>
      <p>{email}</p>
      <p>{password}</p>
      <p>{chseck_in.toString()}</p>
    </>
  );
}
