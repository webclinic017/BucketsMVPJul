import React from "react";

const WaitingList = (showList, setShowWaitingList) => {
  return (
    <>
      {showList ? (
        <div
          style={{ width: "500px", height: "500px", backgroundColor: "white" }}
        >
          waiting list
        </div>
      ) : null}
    </>
  );
};

export default WaitingList;
