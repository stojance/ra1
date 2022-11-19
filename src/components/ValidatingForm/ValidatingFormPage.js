import { useState } from "react";
import ShowData from "./ShowData";
import ValidatingFormExample from "./ValidatingFormExample";

const onSubmit = (v) => alert("Submit value: " + JSON.stringify(v, null, 2));

export default function ValidatingFormPage() {
  const [formFields, setFormFields] = useState({});
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState();

  return (
    <div>
      <ValidatingFormExample
        onChange={(ff, v, e) => {
          setFormFields(ff);
          setValid(v);
          setErrors(e);
        }}
        onSubmit={onSubmit}
        initialValue={{
          name: "Riste Ristev",
          address1: "1 Main Street",
        }}
      />
      <ShowData formFields={formFields} errors={errors} valid={valid} />
    </div>
  );
}
