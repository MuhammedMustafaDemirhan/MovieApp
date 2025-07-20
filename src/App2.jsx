import Header from "./components/Header";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Loading from "./components/Loading";
import SearchForm from "./components/SearchForm";
import WatchListButton from "./components/WatchListButton";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import WatchList from "./components/WatchList";
import { useState, useEffect } from "react";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

const api_key = "b93ccaebf15383ef98669a139312da84";
const page = 1;
const query = "black panter";
const language = "tr-TR";

export default function App2() {
  const [movies, setMovies] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [isWatchListOpen, setIsWatchListOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}&page=${page}&language=${language}`
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

    if (searchQuery.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    getMovies();
  }, [searchQuery]);

  function handleAddToWatchList(movie) {
    const isAddedToList = watchListMovies.map((i) => i.id).includes(movie.id);

    if (!isAddedToList) {
      setWatchListMovies((movies) => [...movies, movie]);
    }
  }

  function handleRemoveFromWatchList(movie) {
    setWatchListMovies((movies) => movies.filter((i) => i.id !== movie.id));
  }

  function handleSelectedMovie(movie) {
    setSelectedMovie(movie);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Header>
        <Logo />
        <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <WatchListButton
          movies={watchListMovies}
          onSetIsWatchListOpen={setIsWatchListOpen}
        />
      </Header>
      <Main>
        {selectedMovie && (
          <MovieDetails
            movieObj={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
        <WatchList
          movies={watchListMovies}
          isWatchListOpen={isWatchListOpen}
          onRemoveFromWatchList={handleRemoveFromWatchList}
        />
        {loading && <Loading />}
        {!loading && !error && (
          <MovieList
            movies={movies}
            onAddToList={handleAddToWatchList}
            onSelectedMovie={handleSelectedMovie}
          />
        )}
        {error && <ErrorMessage message={error} />}
      </Main>
      <Footer />
    </>
  );
}

// export default App;

// Dışardan erişilebilir olması için export ediyor olmamız gerekiyor. Fonk tanımlarken veya en altta yazılabilir.
//Default olarak eklemiş olduğumuz bileşen default olarak export ettiğimiz import ederken de belirtmemiz gerekmeyen bileşeni temsil eder.
