"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import Filters from "@/components/mostWatchedElements/filters";
import MovieGrid from "@/components/movieGrid";
import { API_KEY, BASE_URL } from "@/utils/constants/apiInfo";

const MostWatched = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({genre: "", year: "", score: "All scores",});
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMovies = async () => {
    if (loading) return;

    setLoading(true);
    try {
      let scoreFilter: any = {};
      if (filters.score === "5-6") {
        scoreFilter = { "vote_average.gte": 5, "vote_average.lte": 6 };
      } else if (filters.score === "7-8") {
        scoreFilter = { "vote_average.gte": 7, "vote_average.lte": 8 };
      } else if (filters.score === "8-9") {
        scoreFilter = { "vote_average.gte": 8, "vote_average.lte": 9 };
      } else if (filters.score === "9+") {
        scoreFilter = { "vote_average.gte": 9 };
      }

      const yearFilter =
        filters.year === "Even earlier"
          ? { "release_date.lte": "1950-01-01" }
          : filters.year
          ? { primary_release_year: filters.year }
          : {};

      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          page: page,
          with_genres: filters.genre,
          ...yearFilter,
          ...scoreFilter,
          sort_by: "popularity.desc",
        },
      });

      const newMovies = response.data.results;
      const uniqueMovies = Array.from(new Set([...movies, ...newMovies].map((movie) => movie.id)))
        .map((id) => [...movies, ...newMovies].find((movie) => movie.id === id));

      setMovies(uniqueMovies);
      setHasMore(newMovies.length > 0);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    setMovies([]);
    setPage(1);
  };

  useEffect(() => {
    fetchMovies();
  }, [filters, page]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 pt-28">
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        <MovieGrid movies={movies} />
        <div ref={observerRef} className="h-10"></div>
        {loading && <p className="fixed inset-0 flex justify-center items-end pb-8 z-50 text-3xl">Loading...</p>}
      </div>
    </div>
  );
};

export default MostWatched;
