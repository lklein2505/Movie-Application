import React, { useEffect, useState } from "react";
import MovieCard from "./movieCard";
import { API_KEY, BASE_URL } from "../utils/constants/apiInfo";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface StreamingService {
  name: string;
  movies: Movie[];
}

const TopMoviesSection = () => {
  const [streamingServices, setStreamingServices] = useState<StreamingService[]>([]);
  const [loading, setLoading] = useState(true);

  const serviceIds = {
    Netflix: 8,
    "Amazon Prime": 9,
    "Disney+": 337,
  };

  const fetchTopMovies = async (serviceName: string, providerId: number) => {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_watch_providers=${providerId}&watch_region=US&sort_by=popularity.desc`
    );
    const data = await response.json();
    return { name: serviceName, movies: data.results.slice(0, 3) };
  };

  const fetchAllTopMovies = async () => {
    try {
      const services = await Promise.all(
        Object.entries(serviceIds).map(([name, id]) => fetchTopMovies(name, id))
      );
      setStreamingServices(services);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTopMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <section className="px-4 md:px-16 py-8">
      {/* Title Section */}
      <div className="flex justify-center items-center my-16 h-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Top 3 Movies by Streaming Service
        </h2>
      </div>

      {/* Movies grouped by Streaming Services */}
      <div className="space-y-12">
        {streamingServices.map((service) => (
          <div
            key={service.name}
            className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 px-4 md:px-16 lg:px-24"
          >
            {/* Streaming Service Title */}
            <div className="flex justify-center lg:justify-start lg:items-center mb-4 lg:mb-0 lg:w-[200px]">
              <h3
                className="text-4xl font-semibold text-violet-200 whitespace-normal break-words text-center lg:text-left"
              >
                {service.name}
              </h3>
            </div>

            {/* Movie List */}
            <div className="flex overflow-x-auto space-x-6 scrollbar-hide items-center lg:space-x-8">
              {service.movies.map((movie, index) => (
                <div
                  key={movie.id}
                  className="relative flex-shrink-0 w-36 sm:w-44 md:w-56"
                >
                  {/* Movie Card */}
                  <MovieCard movie={movie} />

                  {/* Movie Ranking */}
                  <div
                    className="absolute top-2 left-2 text-xl sm:text-2xl font-bold text-violet-100 bg-gray-800 bg-opacity-80 rounded-3xl p-3"
                    style={{ zIndex: 1 }}
                  >
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopMoviesSection;
