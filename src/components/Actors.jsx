export default function Actors({ actors }) {
  return (
    <div className="container my-3">
      <h1 className="mb-3 h4">Actors</h1>
      <div className="row">
        {actors.slice(0, 12).map((actor) => (
          <div className="col-md-2 text-center" key={actor.id}>
            {actor.profile_path ? (
              <img
                src={"https://image.tmdb.org/t/p/w185" + actor.profile_path}
                alt={actor.name}
                className="img-fluid rounded img-thumbnail shadow"
              />
            ) : (
              <div
                className="rounded border d-flex align-items-center justify-content-center"
                style={{
                  width: "100%",
                  aspectRatio: "2/3",
                  backgroundColor: "#f0f0f0",
                  color: "#aaa",
                  fontSize: "14px",
                }}
              >
                No Image
              </div>
            )}
            <p className="mt-2">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
