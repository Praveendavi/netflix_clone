import React from 'react';
import { Link } from 'react-router-dom'
import NetflixLogo from '../../images/Netflix_Logo_DigitalVideo.png'

const Navbar = () => {
    return (
        <div className="navbar_section">
            <div className="navbar_container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand exact" to="/"><img className="netflix_logo" src={NetflixLogo} /></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto ">
          {
            localStorage.getItem('signin') ? 
            <li className="nav-item ">
            <Link className="nav-link login_btn exact" to="/logout">Logout</Link>
          </li> :
            <li className="nav-item">
            
            <Link className="nav-link exact" to="/Signin">Signin</Link>
          </li> 
          
          }
        </ul>
      </div>
    </div>
</nav>
            </div>
        </div>
    )
}

export default Navbar
