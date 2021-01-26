import React from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from './Navbar'
<Navbar />
const Logout = () =>{
    localStorage.clear();
    return(
        <Redirect to="/signin" />
    )
}

export default Logout