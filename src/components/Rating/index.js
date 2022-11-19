import React from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

export default function Rating(props) {
  const { value, onChange, color, fontSize } = props;
  const [rating, setRating] = React.useState(0);

  React.useEffect(() => {
    setRating(value);
  }, [value]);

  const handleChange = (val) => {
    setRating(val);
    if (onChange) {
      onChange(val);
    }
  };

  const style = {
    starStyle: {
      cursor: "pointer",
      color: color || "orange",
      fontSize: fontSize || 22,
    },
  };

  return (
    <div style={style.starStyle}>
      {rating >= 1 ? (
        <IoIosStar onClick={() => handleChange(1)} />
      ) : (
        <IoIosStarOutline onClick={() => handleChange(1)} />
      )}
      {rating >= 2 ? (
        <IoIosStar onClick={() => handleChange(2)} />
      ) : (
        <IoIosStarOutline onClick={() => handleChange(2)} />
      )}
      {rating >= 3 ? (
        <IoIosStar onClick={() => handleChange(3)} />
      ) : (
        <IoIosStarOutline onClick={() => handleChange(3)} />
      )}
      {rating >= 4 ? (
        <IoIosStar onClick={() => handleChange(4)} />
      ) : (
        <IoIosStarOutline onClick={() => handleChange(4)} />
      )}
      {rating >= 5 ? (
        <IoIosStar onClick={() => handleChange(5)} />
      ) : (
        <IoIosStarOutline onClick={() => handleChange(5)} />
      )}
    </div>
  );
}
