import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Movie from "../components/Movie";
import MovieList from "../components/MovieList";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = "b93ccaebf15383ef98669a139312da84";
const page = 1;
const language = "tr-TR";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getMovie() {
      try {
        const response = await fetch(
          `${apiUrl}/movie/popular?api_key=${api_key}&page=${page}&language=${language}`
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
        }
        setError("");
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    }

    getMovie();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return <MovieList movies={movies} title="Popüler Filmler" />;
}
