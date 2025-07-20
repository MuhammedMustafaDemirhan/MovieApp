import { Link } from "react-router-dom";

export default function Movie({ movieObj }) {
  return (
    <div className="col">
      <div className="card movie position-relative h-100">
        {/* Eğer poster varsa göster, yoksa boş çerçeve */}
        {movieObj.poster_path ? (
          <img
            src={"https://image.tmdb.org/t/p/w500/" + movieObj.poster_path}
            alt={movieObj.title}
            className="card-img-top"
            style={{ height: "300px", objectFit: "cover" }}
          />
        ) : (
          <div
            className="card-img-top d-flex align-items-center justify-content-center border bg-light text-muted"
            style={{
              height: "300px",
              objectFit: "cover",
              fontSize: "14px",
            }}
          >
            No Image
          </div>
        )}

        <div className="card-body">
          <h2 className="h6 card-title">{movieObj.title}</h2>

          {/* Kartın tamamını tıklanabilir yapmak için görünmez link */}
          <Link
            to={`/movies/${movieObj.id}`}
            className="stretched-link"
            style={{ textDecoration: "none", color: "inherit" }}
          ></Link>
        </div>
      </div>
    </div>
  );
}
