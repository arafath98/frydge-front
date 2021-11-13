import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function Scanner() {
  const [data, setData] = React.useState("Not Found");

  return (
    <>
      <BarcodeScannerComponent
        width={"100%"}
        height={"100%"}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          else setData("Not Found");
        }}
      />
      <p>{data}</p>
    </>
  );
}

export default Scanner;