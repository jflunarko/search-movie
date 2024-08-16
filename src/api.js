import axios from "axios"

export const getMovieList = async() => {
    const movie = await axios.get(`${process.env.REACT_APP_BASEURL}/movie/popular?language=en-US&page=1&api_key=${process.env.REACT_APP_APIKEY}`)
    return movie.data.results
   
}

export const searchMovie = async (q) => {
    const search = await axios.get(`${process.env.REACT_APP_BASEURL}/search/movie?query=${q}&page=1&&api_key=${process.env.REACT_APP_APIKEY}`)
    return search.data
}

export const getMovieById = async (movieId) => {
    const movie = await axios.get(`${process.env.REACT_APP_BASEURL}/movie/${movieId}?&api_key=${process.env.REACT_APP_APIKEY}`);
    return movie.data;
}