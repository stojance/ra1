import React from "react";
import "./loto.css";

const Loto = (props) => {
  const brojNaKombinacii = props.brojNaKonbinacii || 5;
  const brojNaBroevi = props.brojNaBroevi || 7;

  const get7Numbers = () => {
    let arr = [];
    while (arr.length < brojNaBroevi) {
      const br = Math.floor(Math.random() * 37) + 1;
      if (!arr.includes(br)) {
        arr.push(br);
      }
    }
    return arr.sort((a, b) => a - b);
  };

  const drawRow = (key) => (
    <div id={key} className="row m-2 p-4 loto-kombinacija" key={key}>
      {get7Numbers().map(br => (
        <div className="col text-center" key={br}>
          <span className="loto-broj">{br}</span>
        </div>
      ))}
    </div>
  );

  return [...Array(brojNaKombinacii).keys()].map((key) => drawRow(key));
};

export default Loto;
