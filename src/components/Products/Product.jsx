import React from "react";
import { Media } from "reactstrap";
import MySpinner from './../MySpinner/MySpinner';

export default function Product({ data }) {
  return (
    <div className="mb-2">
      {data ? (
        <Media>
          <Media left href="#">
            <Media
              object
              width={150}
              height={150}
              className="mr-3"
              src={data.imageUrl}
              alt="image"
            />
          </Media>
          <Media body>
            <Media heading>
              {data.productName}
              <p>{data.releasedDate}</p>
            </Media>
            {data.description}
          </Media>
        </Media>
      ) : (
        <MySpinner />
      )}
    </div>
  );
}
