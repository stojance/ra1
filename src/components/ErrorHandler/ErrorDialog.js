import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";

const modal_style = {
  closeButton: {
    cursor: "pointer",
  },
  modal: {
    //background: '#b2dbbf',
    width: "600px",
    maxWidth: "800px",
    width: "100%",
  },
};

const ErrorDialog = (props) => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [stringError, setStringError] = useState();

  useEffect(() => {
    setStringError(
      props.error
        ? typeof props.error === "string"
          ? props.error
          : JSON.stringify(props.error, null, 2)
        : null
    );
  }, [props.error]);

  useEffect(() => {
    if (stringError) {
      const lines = stringError.split("\n");
      if (lines) {
        setHeight(lines.length);
      } else {
        setHeight(100);
      }
      console.log("lines", height);
      setWidth(lines.reduce((a, b) => (a < b ? b : a), 100));
    }
  }, [stringError]);

  return (
    <Modal
      open={props.error}
      onClose={props.onClose}
      center
      styles={modal_style}
    >
      <h1>{props.title}</h1>
      <hr />
      <div>
        Something bad happened. The details of the error are below. Please copy
        them and send them to systems support.
        <p />
        <textarea
          id="ErrorDialog-error"
          readOnly
          style={{
            height: height * 4 + "ex",
            width: width + "ex",
            maxHeight: "600px"
          }}
          value={stringError}
        />
      </div>
      <div>
        <button
          onClick={() => {
            const copyText = document.getElementById("ErrorDialog-error");
            copyText.select();
            document.execCommand("copy");
            props.onClose();
          }}
        >
          Copy Error
        </button>
      </div>
    </Modal>
  );
};
export default ErrorDialog;
