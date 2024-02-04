import React, { useEffect, useState } from "react";
import "./Home.scss"
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apiKey = "7385e9def43ebbf690de43ad615b9753";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original"
const nowPlaying = "now_playing"
const popular = "popular"
const toprated = "top_rated"
const upcoming = "upcoming";







const Card = ({ img }) => (

    <img className='card' src={img} alt="cover" />
)
const Row = ({ title, arr = [] }) => (

    <div className='row'>
        <h2>{title}</h2>
        <div>
            {
                arr.map((item, index) => (
                    <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
                ))
            }


        </div>
    </div>
)

const Home = () => {

    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [nowplayingMovies, setNowplayingMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [topratedMovies, setTopratedMovies] = useState([])
    const [genre, setGenre] = useState([])

    useEffect(() => {

        const fetchUpcoming = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
            setUpcomingMovies(results);

        };
        const fetchNowPlaying = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
            setNowplayingMovies(results);

        };
        const fetchPopular = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
            setPopularMovies(results);

        };
        const fetchTopRated = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${toprated}?api_key=${apiKey}`);
            setTopratedMovies(results);

        };
        const getAllGenre = async () => {
            //https://api.themoviedb.org/3/genre/movie/list?api_key=7385e9def43ebbf690de43ad615b9753
            const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
            setGenre(genres);
            console.log(genres)

        };
        getAllGenre();
        fetchUpcoming();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
    }, [])

    return (
        <section className='home'>
            <div className="banner" style={{
                backgroundImage: topratedMovies[0] ? `url(${`${imgUrl}/${topratedMovies[0].poster_path}`})` : "rgb(16,16,16)"
            }}>

                {popularMovies[0] && <h1>{topratedMovies[0].original_title}</h1>}
                {popularMovies[0] && <p>{topratedMovies[0].overview}</p>}


                <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>

            </div>


            <Row title={"Upcoming "} arr={upcomingMovies} />
            <Row title={"Now Playing"} arr={nowplayingMovies} />
            <Row title={"Popular "} arr={popularMovies} />
            <Row title={"Top Rated"} arr={topratedMovies} />


            <div className="genreBox">
                {genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
                ))}
            </div>


        </section>
    )
}

export default Home