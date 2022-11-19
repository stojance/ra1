import React from "react";
import FormContext from "./FormContext";
import "./InputField.css";

const splitCamelCase = (s) =>
  s
    .replace(/([a-z0-9])([A-Z0-9])/g, "$1 $2")
    .replace(/^([a-z])/, (x) => x.toUpperCase());

const InputField = (props) => {
  const form = React.useContext(FormContext);

  if (!form.value) {
    return "InputField should be wrapped in a form";
  }

  const [error, setError] = React.useState("");

  const { onValidate, name, label, ...otherProps } = props;

  let value = form.value && form.value(name);

  React.useEffect(() => {
    if (onValidate) {
      setError(onValidate(value));
    }
  }, [onValidate, value]);

  const setInvalid = form.setInvalid;

  React.useEffect(() => {
    if (setInvalid) {
      setInvalid(name, error);
    }
  }, [setInvalid, name, error]);

  return (
    <div className="InputField">
      <label htmlFor={name}>{label || splitCamelCase(name)}:</label>
      <input
        id={name}
        onBlur={() => form.setDirty(name)}
        value={value || ""}
        onChange={(event) => {
          event.preventDefault();  
          form.setDirty(name);
          form.setValue(name, event.target.value);
        }}
        {...otherProps}
      />{" "}
      {
        <div className="InputField-error">
          {form.isDirty(name) && error ? error : <>&nbsp;</>}
        </div>
      }
    </div>
  );
};

export default InputField;
