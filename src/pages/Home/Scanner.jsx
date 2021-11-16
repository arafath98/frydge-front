import React, { useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import useDidMountEffect from "../../components/UI/customhooks/usedidmount";
import { useNavigate } from "react-router-dom";

function Scanner() {
  const [data, setData] = React.useState({ text: "Scanning... (Make sure the barcode is in focus" });
  const [fetched, setFetched] = React.useState(false)
  const [isItem, setIsItem] = React.useState(false)
  const [date, setDate] = React.useState('')
  const [complete, setComplete] = React.useState('')
  const [scanned, setScanned] = React.useState(false)
  const [showDateInput, setShowDateInput] = React.useState(false)
  const [item1, setItem1] = React.useState({})
  const [item2, setItem2] = React.useState({})
  const [check, setCheck] = React.useState(false)

  const navigate = useNavigate();


  const onChange = (err, result) => {

    if (result) {
      setData({ text: result.text })
    }
  }

  useDidMountEffect(() => {
    let barcodeNo = data.text
    fetch(`https://sleepy-sierra-88173.herokuapp.com/https://api.barcodelookup.com/v3/products?barcode=${barcodeNo}&formatted=y&key=https://api.barcodelookup.com/v3/products?barcode=9780140157376&formatted=y&key=zmfivgzyd1ojblmt39ilbbctxizd9j`)
      .then(resp => resp.json())
      .then(jsondata => setFetched(jsondata.products[0]))
      .catch(resp => console.log('fetch failed'))

    // const { title, images, stores } = fetched

  }, [data.text])
  // barcode, name, expiry, image


  useDidMountEffect(() => {
    console.log(fetched)
    setCheck(fetched)
    setItem1({ barcode: fetched.barcode_number, name: fetched.title, image: fetched.images[0] })
    setScanned(true)
  }, [fetched])

  const confirmedItem = (e) => {
    e.preventDefault()
    setShowDateInput(true)
    setCheck(false)
    console.log(fetched)
  }


  const deniedItem = (e) => {
    e.preventDefault()
    document.getElementById('textbox').value = ''
    setIsItem(false)
    console.log('denied!!!')
  }

  const itemSubmission = (e) => {
    e.preventDefault()
    let date = document.getElementById('date').value
    console.log(date)
    setComplete(true)
    setIsItem(false)
    setDate(date)
    setShowDateInput(false)
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
            width={'100%'}
            height={'100%'}
            onUpdate={onChange}
            delay={100}
          />
          <p className="text-dark display-4">{data.text}</p>
        </>
      }
      {isItem ? <></> : <><form onSubmit={onsubmit} id="form">
        <input id='textbox' type='text' />
        <input type="submit" />
      </form></>
      }
      {check ? <>
        <h1 className="text-dark display-2">Is your product the : {fetched.title} </h1>
        <button className="btn btn-primary mx-5" onClick={confirmedItem}>Yes</button>
        <button className="btn btn-danger" onClick={deniedItem}>No</button> </>
        : <></>}
      {showDateInput ?
        <>
          <h1 className="text-dark display-2">Please enter the item's expiry date</h1>
          <form onSubmit={itemSubmission}>
            <input id="date" type='date' />
            <input type="submit" />
          </form>
        </> : <></>}
      {complete ? <> <h1>Item added! Close to view your items</h1> </> : <></>}
    </>
  )

}

export default Scanner;