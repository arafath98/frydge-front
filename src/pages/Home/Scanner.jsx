import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function Scanner() {
  const [data, setData] = React.useState("Scanning... (Make sure the barcode is in focus");
  const [fetched,setFetched] = React.useState('')


  const onChange = (err, result) => {

    if (result) {
      setData(result.text)
      
      

    }
    else {
      setData("Scanning... (Make sure the barcode is in focus");
      console.log(data)
    }



    // if (result.text == data) {



    


  }

  const onsubmit =  async (e) => {
    e.preventDefault()
    let barcodeNo = e.target[0].value 
    let options = {
      method:'GET',
      mode:'cors',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      // body: JSON.stringify('')
    }

    let data = await fetch(`https://api.barcodelookup.com/v3/products?barcode=${barcodeNo}&formatted=y&key=229f1ted51mo159x702ym3b2txqg5l`, options)
    let jsondata = await data.json()
    console.log(jsondata)
        // .then(resp => console.log(resp))
         
  }
  return (
    <>
      {/* <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={onChange}
      /> */}

      <form onSubmit={onsubmit} id="form">
        {/* <label for="files">Select files:</label>
        <input type="file" id="files" name="files" multiple />
        <br /><br /> */}
        <label for="files">Barcode No.</label>
        <input type='text'/>
        <input type="submit" />
      </form>
      <p>{data}</p>
      <h1>Result:{fetched}</h1>
    </>
  );

}

export default Scanner;