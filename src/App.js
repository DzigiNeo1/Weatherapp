import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");


  const onClickSpan = () => {
    fetch(APIURL).then((resp) =>
      resp.json().then((data) => {
        console.log(data);
        setMovies(data.results);
      })
    );
  };
  useEffect(() => {
    fetch(APIURL).then((resp) =>
      resp.json().then((data) => {
        console.log(data);
        setMovies(data.results);
      })
    );
  }, []);

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };
  console.log(search);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search === "") {
      return fetch(APIURL).then((resp) =>
        resp.json().then((data) => {
          console.log(data);
          setMovies(data.results);
        })
      );
    }
    fetch(SEARCH_API + search).then((resp) =>
      resp.json().then((data) => {
        setMovies(data.results);
      })
    );
 
    setSearch("");
  };
  return (
    <>
      <header>
        <span onClick={onClickSpan} className="home">
          HOME
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="search"
            placeholder="Search..."
            onChange={changeHandler}
            value={search}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
