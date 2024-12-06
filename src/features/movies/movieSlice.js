import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKey } from "../../common/apis/MovieApiKey";
import MovieApi from "../../common/apis/MovieApi";
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMoviesOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMoviesOrShowDetail",
  async (id) => {
    const response = await MovieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // addMovies: (state, { payload }) => {
    //   state.movies = payload;
    // },
    removeSelectedMoviesOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovies.pending, () => {
      console.log("Pending");
    });
    builder.addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
      console.log("Fetched successfully");
      return { ...state, movies: payload };
    });
    builder.addCase(fetchAsyncMovies.rejected, () => {
      console.log("Rejected");
    });
    builder.addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
      console.log("Fetched successfully");
      return { ...state, shows: payload };
    });
    builder.addCase(
      fetchAsyncMoviesOrShowDetail.fulfilled,
      (state, { payload }) => {
        console.log("Fetched Successfully!");
        return { ...state, selectMovieOrShow: payload };
      }
    );
  },
});
export const { removeSelectedMoviesOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
