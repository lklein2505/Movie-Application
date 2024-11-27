"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import NewestMoviesSection from "../components/newestMoviesSection";
import TopMoviesSection from "@/components/topMoviesSection";
import MoviesByGenreSection from "@/components/moviesByGenreSection";
import { API_KEY, BASE_URL } from "@/utils/constants/apiInfo";

// Movie interface
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  streamingServices?: string[];
}

// Genre interface
interface Genre {
  id: number;
  name: string;
}

const genres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 14, name: "Fantasy" },
  { id: 16, name: "Animation" },
];

const Home = () => {
  const [newestMovies, setNewestMovies] = useState<Movie[]>([]);  // Ensure to use Movie[] type
  const [moviesByGenre, setMoviesByGenre] = useState<Record<number, Movie[]>>({});
  const [activeGenreIndex, setActiveGenreIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch newest and top-rated movies concurrently
        const [newestResponse, topResponse] = await Promise.all([
          axios.get(`${BASE_URL}/movie/now_playing`, { params: { api_key: API_KEY } }),
          axios.get(`${BASE_URL}/movie/top_rated`, { params: { api_key: API_KEY } }),
        ]);
        
        // Take the first 10 newest movies and top 3 top-rated movies
        setNewestMovies(newestResponse.data.results.slice(0, 10));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Fetching movies by genre
  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const genreMovies: Record<number, Movie[]> = {};
        for (const genre of genres) {
          const response = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
              api_key: API_KEY,
              with_genres: genre.id,
              sort_by: "popularity.desc",
            },
          });
          genreMovies[genre.id] = response.data.results.slice(0, 3);
        }
        setMoviesByGenre(genreMovies);
      } catch (error) {
        console.error("Error fetching movies by genre:", error);
      }
    };
    fetchMoviesByGenre();
  }, []);

  return (
    <div>
      {/* Pass favoriteMovies and toggleFavorite to Navbar */}
      <Navbar />

      <div className="container mx-auto p-4 pt-16">

        <h1 className="mt-40 mb-12 text-center text-5xl text-bold text-violet-200"> The movie app you've been seeking for a long time! </h1>
        <h2 className="mb-12 text-center text-2xl text-gray-400"> With "Klein Movies", you have all the information about every movie just around the corner...</h2>

        {/* Newest Movies */}
        <NewestMoviesSection
          movies={newestMovies}
        />

        {/* Top 3 Movies */}
        <TopMoviesSection />

        {/* Movies by Genre */}
        <MoviesByGenreSection
          genreName={genres[activeGenreIndex].name}
          movies={moviesByGenre[genres[activeGenreIndex].id] || []}
          activeGenreIndex={activeGenreIndex}
          setActiveGenreIndex={setActiveGenreIndex}
        />
      </div>
    </div>
  );
};

export default Home;
