import React from "react";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import MainLayout from "./layouts/MainLayout";
import SearchResults from "./pages/SearchResults";
import UserWatchList from "./pages/UserWatchList";
import Login from "./pages/LoginState";
import Register from "./pages/Register";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> }, // Default route burasıdır. index'i true olan yer defaulttur.
      { path: "movies", element: <Movies /> }, // "/movies" => Movies
      { path: "movies/:id", element: <MovieDetails /> }, // "/movies/1" => MovieDetails
      { path: "search", element: <SearchResults /> }, // search?q=father
      { path: "watchlist", element: <UserWatchList /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}
