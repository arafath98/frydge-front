import React, { useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import useDidMountEffect from "../../components/UI/customhooks/usedidmount";
import { useNavigate } from "react-router-dom";

function Scanner() {
  const [data, setData] = React.useState({ text: "Scanning..." });
  const [fetched, setFetched] = React.useState(false)
  const [isItem, setIsItem] = React.useState(true)
  const [date, setDate] = React.useState('')
  const [complete, setComplete] = React.useState('')
  const [scanned, setScanned] = React.useState(false)
  const [showDateInput,setShowDateInput] = React.useState(false)
  const [item1, setItem1] = React.useState({})
  const [item2,setItem2] = React.useState({})
  const [check,setCheck] = React.useState(false)
  const [barcodeInputShow,setBarcodeInputShow] = React.useState({})





  const navigate = useNavigate();





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
    console.log(barcodeNo)
    fetch(`https://sleepy-sierra-88173.herokuapp.com/https://api.barcodelookup.com/v3/products?barcode=${barcodeNo}&formatted=y&key=2vd79xb8zc3ika62d6qvnbfsqonwm2`)
    .then(resp => resp.json())
      .then(jsondata => setFetched(jsondata.products[0]))
    .catch(resp => console.log('fetch failed'))
    
    // const { title, images, stores } = fetched
    
  }, [data.text])
  // barcode, name, expiry, image


useDidMountEffect(() => {
    console.log(fetched)
    setCheck(fetched)
    setItem1({ barcode: fetched.barcode_number , name: fetched.title , image:fetched.images[0]})
    setScanned(true)
    

},[fetched])

  const confirmedItem = (e) => {
    e.preventDefault()
    setShowDateInput(true)
    setCheck(false)
    console.log(fetched)
  }


  const deniedItem = (e) => {
    e.preventDefault()
    // 
    setIsItem(false)
    setCheck(false)
    console.log('denied!!!')
  }

  const manualShow = (e) => {
    e.preventDefault()
    let pressedBtn = e.target.value
    setScanned(true)
    setCheck(false)
    console.log(pressedBtn)
    if(pressedBtn == 'Manually input name') {
      setIsItem(false)
    } 
    else {
      setBarcodeInputShow(false)
    }
    
    
    
  }

  useDidMountEffect(() => {
    console.log(item1)
},[item1])

  const manualSubmit = (e) => {
    e.preventDefault()
    let name = document.getElementById('textbox').value
    setItem1({ barcode: 1 , name , image:"https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"})
    setShowDateInput(true)
    setIsItem(true)
    console.log('here is submit')
    
  } 

  const manualBarcodeSubmit = (e) => {
    e.preventDefault()
    let barcodeNo = document.getElementById('barcodebox').value
    console.log(barcodeNo)
    fetch(`https://sleepy-sierra-88173.herokuapp.com/https://api.barcodelookup.com/v3/products?barcode=${barcodeNo}&formatted=y&key=2vd79xb8zc3ika62d6qvnbfsqonwm2`)
    .then(resp => resp.json())
      .then(jsondata => setFetched(jsondata.products[0]))
    setIsItem(true)

    setBarcodeInputShow(true)
    console.log('here is submit')
    
  }

//   useDidMountEffect(() => {
//     setCheck(true)
// },[barcodeInputShow])

  const itemSubmission = (e) => {
    e.preventDefault()
    let date = document.getElementById('date').value
    console.log(date)
    
    if(fetched) setIsItem(false)
    else (setIsItem(true))
    
    setDate(date)
    setShowDateInput(false)
    setIsItem(true)
    setItem2({...item1,expiry:date})
    
    
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
            body:JSON.stringify(item2)
        }

      fetch(`https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/items/create/`,options)
      .then(resp => resp.json())
      .then(resp => console.log(resp))
      .then(resp => setComplete(true))

},[item2])

  return (
    <>
    { scanned ?
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

  <input type='button' data-toggle="button" aria-pressed="false" autoComplete="off" className='btn btn-primary my-3' value='Manually input barcode' onClick={manualShow}/>
  <input type='button' data-toggle="button" aria-pressed="false" autoComplete="off" className='btn btn-primary' value='Manually input name' onClick={manualShow}/>

</div>
  
 
        </div>
    </>
    
}
{ isItem ? <></>:<><form onSubmit={manualSubmit} id="form">
  <label className='mx-2'>Item name:</label>
        <input id='textbox' type='text'/>
        <input type="submit" className='mx-1 btn btn-primary'/>
      </form></>
      
}
{ barcodeInputShow ? <></>:<><form onSubmit={manualBarcodeSubmit} id="form">
  <label className='mx-2'>Barcode No:</label>
        <input id='barcodebox' type='text'/>
        <input type="submit" className='mx-1 btn btn-primary'/>
      </form></>
      
}

      

      {check ? <>

        <p className="text-dark">Is your product the : {fetched.title} </p>
        <button className="btn btn-primary mx-5" onClick={confirmedItem}>Yes</button>
        <button className="btn btn-danger" onClick={deniedItem}>No</button> </>
        : <></>}


      {showDateInput ?
        <>
          <p className="text-dark display-2">Please enter the item's expiry date</p>
          <form onSubmit={itemSubmission}>
            <input id="date" type='date' />
            <input type="submit" />
          </form>


        </> : <></>}

      {complete ? <> <h1>Item added! Close to view your items</h1> </> : <></>}

    </>
  );

}

export default Scanner;