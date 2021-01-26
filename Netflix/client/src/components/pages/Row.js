import React,{ useState, useEffect } from 'react'
import axios from './axios'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'



const base_url = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl }){

    const [ movies, setMovies ] = useState([])
    const [ trailerUrl, setTrailerUrl ] = useState("")

    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    },[fetchUrl])

    const opts = {
        height: '390',
        width: '100%',
        playerVars:{
            autoPlay: 1,
        },
    };

    // console.log(movies)

    const handleClick = (movie) =>{
        if(trailerUrl){
            setTrailerUrl("");
        }
        else{
            movieTrailer(movie?.name || movie?.title || movie?.orignals_name || "")
            .then(url =>{
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get("v")); 
            console.log(urlParams)
            }).catch(error=>{
                console.log(error)
            })
        }
    }


    return(
        <div className="section">
            <h4>{title}</h4>
            <div className="movie_card_container">
            {
                movies.map(movie =>(
                    <div className="movie_section" >
                        <img key={movie.id} className="poster_img" src={`${base_url}${movie.poster_path }`} onClick={() => handleClick(movie)} />
                        {/* <h2>{movie.name}</h2> */}
                    </div>
                ))
            }
            </div>
            { trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }

          

        </div>
    )
}


export default Row
