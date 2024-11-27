"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import MovieGrid from "@/components/movieGrid";
import { API_KEY, BASE_URL } from "@/utils/constants/apiInfo";

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        );
        const data = await response.json();
        if (data.results) {
          setSearchResults(data.results);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to load search results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 pt-24">
        {/* Only render the title after loading is complete */}
        {!loading && searchResults.length > 0 && (
          <h1 className="text-2xl font-bold m-8 text-center text-violet-200">
            Search Results for "{query}"
          </h1>
        )}

        {/* Loading screen */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-400 border-solid"></div>
          </div>
        )}

        {/* Error handling */}
        {error && (
          <p className="text-center text-red-500 mt-6">{error}</p>
        )}

        {/* Display "No results found" when loading is complete and no results are found */}
        {!loading && !error && searchResults.length === 0 && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
            <p className="text-center text-3xl text-violet-300 text-bold mt-6">
              No results found for "{query}".
            </p>
          </div>
        )}

        {/* Display search results */}
        {!loading && !error && searchResults.length > 0 && (
          <MovieGrid movies={searchResults} />
        )}
      </div>
    </div>
  );
};

// Wrap the SearchPageContent with Suspense
const SearchPage = () => {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
