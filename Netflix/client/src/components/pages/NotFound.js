import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="notfound_section">
            <div className="notfound_container">
                <div className="notfound_menu">
                    <h2>404 Error This Page is not Found</h2>
                    <Link to="/"  >Back To Home</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
