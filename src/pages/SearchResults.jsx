import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieList from "../components/MovieList";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_TMDB_API_KEY;

const page = 1;
const language = "tr-TR";

export default function SearchResults() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);

  const query = searchParams.get("q");
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    async function getMovie() {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/search/movie?api_key=${api_key}&query=${query}&page=${page}&language=${language}`
        );
        if (response.status === 404) {
          throw new Error("Film Bulunamadı");
        } else if (response.status === 401) {
          throw new Error("API anahtarı hatalı veya geçersiz");
        } else if (response.status === 500) {
          throw new Error("Sunucu hatası, lütfen daha sonra tekrar deneyin");
        } else if (response.status === 503) {
          throw new Error(
            "Servis geçici olarak kullanılamıyor, lütfen daha sonra tekrar deneyin"
          );
        }
        if (!response.ok) {
          throw new Error("Hata oluştu");
        }
        const data = await response.json();

        if (data.results) {
          setMovies(data.results);
          setTotalPages(data.total_pages);
        }
        setError("");
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    }

    getMovie();
  }, [searchParams]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <MovieList movies={movies} title={`Arama Sonuçları: ${query}`} />
      <Pagination
        page={page}
        setSearchParams={setSearchParams}
        query={query}
        totalPages={totalPages}
      />
    </>
  );
}
