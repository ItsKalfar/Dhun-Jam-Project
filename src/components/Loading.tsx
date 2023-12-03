import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Loading: React.FC = () => {
  return (
    <div className="loading-styles">
      <BeatLoader
        color={"#6741d9"}
        loading={true}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
