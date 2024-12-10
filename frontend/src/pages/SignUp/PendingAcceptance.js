import React from "react";
import EmptyResponseLogo from "../../component/EmptyResponseLogo";

const PendingAcceptance = () => {
  return (
    <div>
      <EmptyResponseLogo
        isVisible={true}
        size="300px"
        text={"Your documents are being reviewed , come back later!"}
      />
    </div>
  );
};

export default PendingAcceptance;
