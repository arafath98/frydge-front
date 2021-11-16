import React, {useContext} from 'react'
import { Context } from '../../Context'

const Darkmode = () => {
    const { theme, colors, setTheme } = useContext(Context)

    const switched = (e) => {
        // e.preventDefault()
       e.target.checked ? setTheme('dark'): setTheme('light')
        console.log(e.target.checked) //value is true or false
    }

    return (
        <>
        <div class="container d-flex p-3 mx-auto w-100 flex-column">
    <header class="mb-auto"/>
      <div class="float-md-start fw-bold fs-5"></div>
      <nav class="nav justify-content-center float-md-end">
        <div class="nav-link">
          <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" id="darkSwitch" onClick={switched}/>
            <label class="custom-control-label" for="darkSwitch">Dark Mode</label>
          </div>
        </div>
        </nav>
        </div>
        </>
    )
}

export default Darkmode
