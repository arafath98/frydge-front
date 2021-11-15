import React from 'react'
const NavigationBar = () => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-md navbar-dark">
                <div className="d-flex justify-content-center">
                    <div>
                        <a href="#" className="navbar-brand">
                            {/* <img src=/> */}
                            <span>FRYDGE</span>
                        </a>
                    </div>
                    <div >
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><a className="nav-link" href="/register">Register</a></li>
                            <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavigationBar
