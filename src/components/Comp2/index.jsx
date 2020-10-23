import React from "react";
import DatePicker from "react-datepicker";
import { useFileUpload } from "use-file-upload";
import {Button} from 'reactstrap';

const Comp2 = (props) => {
  const [date1, setDate1] = React.useState(new Date());
  const [files, setFiles] = useFileUpload();

  return (
    <div>
      <ul>
        {props.list.map((v, i) => {
          return <li key={i}>{v}</li>;
        })}
      </ul>
      <DatePicker
        selected={date1}
        onChange={(date) => setDate1(date)}
        dateFormat="dd.MM.yyyy"
      />
      <p>{date1.toISOString()}</p>

      <Button
        onClick={() => {
          // Single File Upload
          setFiles({ multiple: true, accept: 'image/*' }, (files) => {
            // Note callback return an array
            files.map(({ source, name, size, file }) => {
              console.log({ source, name, size, file });
            });
            // Todo: Upload to cloud.
          });
        }}
      >
        Click to Upload
      </Button>

      {files ? (
        files.map((file) => (
          <div key={file.name}>
            <img src={file.source} alt="preview" />
            <span> Name: {file.name} </span>
            <span> Size: {file.size} </span>
          </div>
        ))
      ) : (
        <span>No file selected</span>
      )}
    </div>
  );
};

export default Comp2;
