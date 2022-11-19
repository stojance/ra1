import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Comp2 = (props) => {
  const [date1, setDate1] = React.useState(new Date());
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="btn btn-primary" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <div className="mt-2">
      <ul>
        {props.list.map((v, i) => {
          return <li key={i}>{v}</li>;
        })}
      </ul>
      <DatePicker className="form-control"  selected={date1} onChange={(date) => setDate1(date)} dateFormat="dd.MM.yyyy" />
      <DatePicker selected={date1} onChange={(date) => setDate1(date)} dateFormat="dd.MM.yyyy" customInput={<ExampleCustomInput />} />
      <p>{date1.toISOString()}</p>
    </div>
  );
};

export default Comp2;
