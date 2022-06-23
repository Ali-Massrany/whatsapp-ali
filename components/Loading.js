import React from "react";
import { Circle } from "better-react-spinkit";
function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"
          }
          alt=""
          height={200}
          styled={{ marginBottom: 10 }}
        />
        <Circle color="#3cbc28" size={60} />
        <p style={{ fontWight: "bold" }}>
          {" "}
          By Ali Massrany <span>&#174;</span>
        </p>
      </div>
    </center>
  );
}

export default Loading;
