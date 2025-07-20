import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "dark" ? "light" : "dark";
  return (
    <footer
      className={`bg-${theme} text-center text-${textColor} border-top border-body`}
    >
      <div className="container p-4">
        <section className="mb-4">
          <a
            className={`btn btn-outline-${textColor} btn-floating m-1`}
            href="https://www.linkedin.com/in/muhammedmustafademirhan/"
            role="button"
            target="_blank"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            className={`btn btn-outline-${textColor} btn-floating m-1`}
            href="https://github.com/MuhammedMustafaDemirhan"
            role="button"
            target="_blank"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            className={`btn btn-outline-${textColor} btn-floating m-1`}
            href="https://www.instagram.com/mami.dmrhn/"
            role="button"
            target="_blank"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </section>
      </div>

      <div className="text-center p-3">
        © 2026 Copyright:
        <a className={`text-${textColor}`} href="#!">
          Movie App
        </a>
      </div>
    </footer>
  );
}
