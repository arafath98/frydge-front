import React, { useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import useDidMountEffect from "../../components/UI/customhooks/usedidmount";

function Scanner() {
  const [data, setData] = React.useState({ text: "Scanning... (Make sure the barcode is in focus" });
  const [fetched, setFetched] = React.useState(false)
  const [isItem, setIsItem] = React.useState(false)
  const [date, setDate] = React.useState('')
  const [complete, setComplete] = React.useState('')
  const [scanned, setScanned] = React.useState(false)
  const [item1, setItem1] = React.useState({})
  const [item2, setItem2] = React.useState({})

  const onChange = (err, result) => {

    if (result) {
      setData({ text: result.text })
    }
  }

  // useDidMountEffect(() => {
  //   setScanned(true)
  // }, [data])

  useDidMountEffect(() => {
    let barcodeNo = data.text
    fetch(`https://sleepy-sierra-88173.herokuapp.com/https://api.barcodelookup.com/v3/products?barcode=${barcodeNo}&formatted=y&key=yrgd17bvjjj9icsxod0zj48cz21qsj`)
      .then(resp => resp.json())
      .then(jsondata => setFetched(jsondata.products[0]))

      .catch(resp => console.log('fetch failed'))
    // const { title, images, stores } = fetched

  }, [data.text])
  // barcode, name, expiry, image


  useDidMountEffect(() => {
    console.log(fetched)
    setItem1({ barcode: fetched.barcode_number, name: fetched.title, image: fetched.images[0] })
    setScanned(true)
    console.log(`scanned:${scanned}`)
    // document.getElementById('barcodecam').stopStream = true
    // console.log(fetched)

  }, [fetched])

  const confirmedItem = (e) => {
    e.preventDefault()
    setIsItem(true)
    console.log(fetched)
  }


  const deniedItem = (e) => {
    e.preventDefault()
    document.getElementById('textbox').value = ''
    console.log('denied!!!')
  }

  const itemSubmission = (e) => {
    e.preventDefault()
    let date = document.getElementById('date').value
    console.log(date)
    setComplete(true)
    setIsItem(false)
    setDate(date)

    setItem2({ ...item1, expiry: date })


  }

  useDidMountEffect(() => {
    console.log(item2)

    const token = window.localStorage.getItem("token");

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "token": token,
      },
      body: JSON.stringify(item2)
    }

    fetch(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/items/create/`, options)
      .then(resp => resp.json())
      .then(resp => console.log(resp))

  }, [item2])

  return (
    <>
      {scanned ?
        <></>
        :
        <>
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={onChange}
            delay={100}
          />
        </>
      }
      {/* { isItem ? <></>:<><form onSubmit={onsubmit} id="form">
        <input id='textbox' type='text'/>
        <input type="submit" />
      </form></>
      
} */}

      <p className="text-light display-4">{data.text}</p>

      {fetched ? <>

        <h1 className="text-light display-2">Is your product the : {fetched.title} </h1>
        <button className="btn btn-primary mx-5" onClick={confirmedItem}>Yes</button>
        <button className="btn btn-danger" onClick={deniedItem}>No</button> </>
        : <></>}


      {isItem ?
        <>
          <h1 className="text-light display-2">Please enter the item's expiry date</h1>
          <form onSubmit={itemSubmission}>
            <input id="date" type='date' />
            <input type="submit" />
          </form>


        </> : <></>}

      {complete ? <> <h1 className="text-light display-2">Would you like to add the item with:</h1><p className="text-light display-2">Name : {fetched.title}</p> <p className="text-light display-2">Expiry Date: {date}</p>  </> : <></>

      }

    </>
  );

}

export default Scanner;