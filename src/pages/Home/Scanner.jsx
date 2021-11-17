import React, { useEffect, useContext } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import useDidMountEffect from "../../components/UI/customhooks/usedidmount";
import { useNavigate } from "react-router-dom";

import { Context } from "../../Context";

function Scanner() {
  const [data, setData] = React.useState({ text: "Scanning..." });
  const [fetched, setFetched] = React.useState(false)
  const [isItem, setIsItem] = React.useState(true)
  const [date, setDate] = React.useState('')
  const [complete, setComplete] = React.useState('')
  const [scanned, setScanned] = React.useState(false)
  const [showDateInput, setShowDateInput] = React.useState(false)
  const [item1, setItem1] = React.useState({})
  const [item2, setItem2] = React.useState({})
  const [check, setCheck] = React.useState(false)
  const [barcodeInputShow, setBarcodeInputShow] = React.useState({})
  const [pleaseInputBarcode, setPleaseInputBarcode] = React.useState(false)
  const [barcodeNotFound, setBarcodeNotFound] = React.useState(false)

  const { setItemsData } = useContext(Context);

  const [noDate, setNoDate] = React.useState(false)
  const navigate = useNavigate();


  const onChange = (err, result) => {

    if (result) {
      setData({ text: result.text })
    }
  }

  useDidMountEffect(() => {

    let barcodeNo = data.text
    fetch(`https://sleepy-sierra-88173.herokuapp.com/https://api.barcodelookup.com/v3/products?barcode=${barcodeNo}&formatted=y&key=a6tvyxuqia7vosai7aidpph8jyw67r`)
      .then(resp => resp.json())
      .then(jsondata => setFetched(jsondata.products[0]))
      .catch(resp => console.log('fetch failed'))

    // const { title, images, stores } = fetched

  }, [data.text])
  // barcode, name, expiry, image


  useDidMountEffect(() => {
    setCheck(fetched)
    setItem1({ barcode: fetched.barcode_number, name: fetched.title, image: fetched.images[0] })
    setScanned(true)
  }, [fetched])

  const confirmedItem = (e) => {
    e.preventDefault()
    setShowDateInput(true)
    setCheck(false)
  }


  const deniedItem = (e) => {
    e.preventDefault()
    // 
    setIsItem(false)
    setCheck(false)
  }

  const manualShow = (e) => {
    e.preventDefault()
    let pressedBtn = e.target.value
    setScanned(true)
    setCheck(false)
    if (pressedBtn == 'Manually input name') {
      setIsItem(false)
    }
    else {
      setBarcodeInputShow(false)
    }



  }


  const manualSubmit = (e) => {
    e.preventDefault()
    let name = document.getElementById('textbox').value
    setItem1({ barcode: 1, name, image: "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg" })
    setShowDateInput(true)
    setIsItem(true)

  }

  const manualBarcodeSubmit = (e) => {
    e.preventDefault()
    setPleaseInputBarcode(false)
    setBarcodeNotFound(false)
    let barcodeNo = document.getElementById('barcodebox').value
    let regExp = /[a-zA-Z]/g; // checks for a letter,  if there is, returns a letter, if not returns false
    if (!barcodeNo || regExp.test(barcodeNo)) {
      setPleaseInputBarcode(true)
    } else {
      fetch(`https://sleepy-sierra-88173.herokuapp.com/https://api.barcodelookup.com/v3/products?barcode=${barcodeNo}&formatted=y&key=a6tvyxuqia7vosai7aidpph8jyw67r`)
        .then(resp => resp.json())
        .then(jsondata => {
          setFetched(jsondata.products[0])
          setIsItem(true)
          setBarcodeInputShow(true)
        })
        .catch(resp => setBarcodeNotFound(true))

    }
  }


  const itemSubmission = (e) => {
    setNoDate(false)
    e.preventDefault()
    let date = document.getElementById('date').value
    if (!date) {
      setNoDate(true)
    } else {

      if (fetched) setIsItem(false)
      else (setIsItem(true))

      setDate(date)
      setShowDateInput(false)
      setIsItem(true)
      setItem2({ ...item1, expiry: date })
    }
  }

  useDidMountEffect(() => {

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
      .then(resp => {
        setComplete(true);
        navigate("/");
        navigate("/home");
      })

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
          <div className='text-center'>
            <p className="text-dark display-4">{data.text}</p>
            <div className='d-flex flex-column'>

              <input type='button' data-toggle="button" aria-pressed="false" autoComplete="off" className='btn btn-primary my-3' value='Manually input barcode' onClick={manualShow} />
              <input type='button' data-toggle="button" aria-pressed="false" autoComplete="off" className='btn btn-primary' value='Manually input name' onClick={manualShow} />

            </div>


          </div>
        </>

      }
      {isItem ? <></> : <><form onSubmit={manualSubmit} id="form">
        <label className='mx-2'>Item name:</label>
        <input id='textbox' type='text' />
        <input type="submit" className='mx-1 btn btn-primary' />
      </form></>

      }
      {barcodeInputShow ? <></> : <><form onSubmit={manualBarcodeSubmit} id="form">
        <label className='mx-2'>Barcode No:</label>
        <input id='barcodebox' type='text' />
        <input type="submit" className='mx-1 btn btn-primary' />
      </form></>




      }
      {pleaseInputBarcode ? <><p className='text-center'>Please input a valid barcode number</p></> : <></>}
      {barcodeNotFound ? <><p className='text-center'>We couldn't find your barcode. Add item manually by name instead</p></> : <></>}
      {check ? <>

        <div className="jumbotron ">
          <h1 className="display-6">We found an item! <br /><hr /> {fetched.title}</h1>

        </div>
        <div className="d-flex flex-row justify-content-center">

          <button className="btn btn-primary mx-4" onClick={confirmedItem}>Yes</button>
          <button className="btn btn-danger mx-4" onClick={deniedItem}>No</button>

        </div>
      </>
        : <></>
      }
      {
        showDateInput ?
          <>
            <p className="text-dark display-2">Please enter the item's expiry date</p>
            <form onSubmit={itemSubmission}>
              <input id="date" type='date' />
              <input type="submit" />
            </form>
          </> : <></>
      }
      {noDate ? <><p className='text-center'>Please enter a date</p></> : <></>
      }
      {complete ? <> <h1>Item added! Close to view your items</h1> </> : <></>}
    </>
  )

}

export default Scanner;