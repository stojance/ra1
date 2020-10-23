import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

const MyInput = ({
  id,
  value,
  type = "text",
  isFocused = false,
  selectAll = true,
  invalid,
  onInputChange,
  children,
}) => (
    <FormGroup>
      <Label for={id}>{children}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        autoFocus={isFocused}
        invalid={invalid !== "" ? true : undefined}
        onChange={onInputChange}
        onFocus={event=>(selectAll && event.target.select())}
      />
      <FormFeedback invalid={invalid !== "" ? "true" : undefined}>
        {invalid}
      </FormFeedback>
    </FormGroup>
  );
export default MyInput;
