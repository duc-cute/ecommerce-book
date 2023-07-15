/** @format */

import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <HashLoader color="#36d7b7" />
    </div>
  );
};

export default Loading;
