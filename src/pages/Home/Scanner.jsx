import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function Scanner() {
  const [data, setData] = React.useState("Scanning... (Make sure the barcode is in focus");
  const [fetched,setFetched] = React.useState(false)
  const [confirmed,setConfirmed] = React.useState(false)
  const [date, setDate] = React.useState('')
  const [complete, setComplete] = React.useState('')
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
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Headers": "*"
      }
      // body: JSON.stringify('')
    }

    let data = await fetch(`https://sleepy-sierra-88173.herokuapp.com/https://api.barcodelookup.com/v3/products?barcode=${barcodeNo}&formatted=y&key=un14xjlrih7lnp1hirbmcg9cpjl0g1`)
    let jsondata = await data.json()
    console.log(jsondata.products[0])
    let object = jsondata.products[0]
    const {title, description, images, stores} = object
    setFetched(object)
    console.log(typeof fetched)
    console.log(typeof fetched === 'string')
    // console.log(title,description,images[0],stores)
        // .then(resp => console.log(resp))

         
  }


  const confirmedItem = (e) => {
    e.preventDefault()
    setFetched('')
    setConfirmed(true)
    console.log(fetched)
  }


  const deniedItem = (e) => {
    e.preventDefault()
    setFetched('')
    document.getElementById('textbox').value = ''
    console.log('denied!!!')
  }

  const datesubmit = (e) => {
    e.preventDefault()
    let date = document.getElementById('date').value
    console.log(date)
    setComplete(true)
    setConfirmed(false)
    setDate(date)
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
        <input id='textbox' type='text'/>
        <input type="submit" />
      </form>
      <p>{data}</p>
      {fetched ? <> 
      
      <h1 className="text-light display-2">Is your product the : {fetched.title} </h1> 
      <button className="btn btn-primary mx-5" onClick={confirmedItem}>Yes</button>
      <button className="btn btn-danger" onClick={deniedItem}>No</button> </>
      : <></>}


      {confirmed ? 
      <>
      <h1 className="text-light display-2">Please enter the item's expiry date</h1>
      <form onSubmit={datesubmit}>
      <input id="date" type='date'/>
      <input type="submit"/>
      </form>


      </>:<></>}

      { complete ? <> <h1 className="text-light display-2">Would you like to add the item with:</h1><p>Name : {fetched.title}</p> <p>Expiry Date: {date}</p>  </>:<></>

      }

    </>
  );

}

export default Scanner;