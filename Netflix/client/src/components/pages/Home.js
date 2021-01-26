import React from 'react'
import Row from './Row'
import requests from './request'
import Navbar from './Navbar'

const Home = () =>{
    
    return (
        <div className="home_section">
        <Navbar />   
        <Row title='Netflix orignals' fetchUrl={requests.fetchNetflixOriginals} />
        <Row title='Trending Now' fetchUrl={requests.fetchTranding} />
        <Row title='Top Rated' fetchUrl={requests.fetchTopRated} />
        <Row title='Action Movies' fetchUrl={requests.fetchActionMovie} />
        <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovie} />
        <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovie} />
        <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovie} />
        <Row title='Documentaries Movies' fetchUrl={requests.fetchDocumentaries} />
     </div>
    )
}

export default Home