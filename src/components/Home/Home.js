import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";

import { fetchAsyncMovies,fetchAsyncShows } from "../../features/movies/movieSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const movieText="Harry"
  const showText="Friends"
  useEffect(() => {
    //const fetchMovies = async () => {
    //   const response = await MovieApi.get(
    //     `?apiKey=${APIKey}&s=${movieText}&type=movie`
    //   ).catch((err) => {
    //     console.log("err:", err);
    //   });
    //   console.log("The response from API", response);

    //dispatch(addMovies(response.data));}
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
