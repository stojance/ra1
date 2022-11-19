import React from "react";
import { data } from "./data";
import DirTree from "./dir-tree";

export default function DirTreePage(props) {
  return (
    <div style={{ margin: "8px" }}>
      <DirTree data={data} />
    </div>
  );
}
