import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../contexts/ThemeContext";

export default function MainLayout() {
  //Alternatif olarak NavLink kullanılabilir. Link'den farklı olarak ilgili tag'a active class'ı atar.
  const { theme } = useContext(ThemeContext);
  const color = theme === "dark" ? "bg-dark text-white" : "bg-light text-dark";
  return (
    <>
      <Navbar />
      <main className={color}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
