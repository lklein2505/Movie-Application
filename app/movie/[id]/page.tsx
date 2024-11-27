"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import CastSection from "@/components/moviePageElements/castSection";
import MovieInfo from "@/components/moviePageElements/movieInfo";
import { API_KEY, BASE_URL } from "@/utils/constants/apiInfo";

interface MovieDetails {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  runtime: number;
  production_countries: { iso_3166_1: string; name: string }[];
  cast: { id: number; name: string; character: string; profile_path: string }[];
}

const MovieDetailsPage = () => {
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const resolvedId = String(id);
          // Fetch movie details
          const movieResponse = await axios.get(`${BASE_URL}/movie/${resolvedId}`, {
            params: { api_key: API_KEY },
          });

          // Fetch cast information separately
          const creditsResponse = await axios.get(`${BASE_URL}/movie/${resolvedId}/credits`, {
            params: { api_key: API_KEY },
          });

          // Set movie and cast
          setMovie({
            ...movieResponse.data,
            cast: creditsResponse.data.cast || [],
          });
        } catch (error) {
          console.error("Error fetching movie details:", error);
          router.push("/");
        }
      };

      fetchMovieDetails();
    }
  }, [id, router]);

  if (!movie) return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 text-3xl">Loading...</div>;

  return (
    <div>
      <Navbar />

      <div className="container mx-auto">
        {/* Full-length Banner Image */}
        <div
          className="relative w-full h-[55vh] bg-cover bg-center rounded-lg"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)",
          }}
        ></div>

        {/* Movie Info */}
        <MovieInfo movie={movie} />

        {/* Cast Section */}
        <CastSection cast={movie.cast} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
