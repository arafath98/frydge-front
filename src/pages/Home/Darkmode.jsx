import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../../Context'

const Darkmode = () => {
    const [check, setCheck] = useState(false)
    const { theme, colors, setTheme } = useContext(Context)

    const switched = (e) => {
       
       theme == 'light' ? setTheme('dark'): setTheme('light')
      
      
        
    }

    useEffect(()=> {
      theme == 'dark' ? setCheck(true): setCheck(false)
    },[theme])

    return (
        <>
        <div class="container d-flex p-3 mx-auto w-100 flex-column">
    <header class="mb-auto"/>
      <div class="float-md-start fw-bold fs-5"></div>
      <nav class="nav justify-content-center float-md-end">
        <div class="nav-link">
          <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" id="darkSwitch" checked={check} onClick={switched}/>
            <label class="custom-control-label" for="darkSwitch">{theme + ' theme'}</label>
          </div>
        </div>
        </nav>
        </div>
        </>
    )
}

export default Darkmode
