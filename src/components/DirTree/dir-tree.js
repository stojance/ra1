import React from "react";

export default function DirTree({ data }) {
  const [hideChildren, setHideChildren] = React.useState({});
  /*
    {
    public: true, // if the folder is opened, set it equal to true
    src: false // if the folder is not opened, set it equal to false
    }
  */
  const toggleChildren = (name) => {
    setHideChildren({ ...hideChildren, [name]: !hideChildren[name] });
  };
  return (
    <div style={{ paddingLeft: "20px" }}>
      {data.map((item) => {
        return (
          <div key={item.name}>
            {item.isFolder && (
              <button
                onClick={() => toggleChildren(item.name)}
                className="btn btn-link"
                style={{paddingLeft: 0}}
              >
                {item.name}
                {" "}
                {hideChildren[item.name] ? <span className="fa fa-sort-down"></span> : <span className="fa fa-sort-up"></span>}
              </button>
            )}
            {!item.isFolder && <span>{item.name}</span>}
            
            <div
              style={{
                display: hideChildren[item.name] ? "none" : "block",
              }}
            >
              {item.children && <DirTree data={item.children} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
