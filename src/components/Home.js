import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './ListaFilmow';
import Heading from './Head';
import SearchBar from './Szukaj';
import { isExpired  } from "react-jwt";

import { Link } from "react-router-dom";

const Home = () => {

  let isNotLoggedIn = isExpired(localStorage.getItem('token'));

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('movie');

  useEffect(() => {
    const getMoviesRequest = async (searchValue) => {
      const url = 'https://pr-movies.herokuapp.com/api/movies';
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson) {

        let validatedJson = [];

        for (let i=0; i<responseJson.length; i++) {
          if (responseJson[i].image && !validatedJson.some(v => (v.image === responseJson[i].image))) {
            validatedJson.push(responseJson[i]);
          }
        }

        setMovies(validatedJson);
      }

    };
    getMoviesRequest(searchValue);
  }, [searchValue]);

  return (
    <div>
      <div style={{paddingLeft: '40px', paddingRight: '50px'}} className='d-flex align-items-center w-100 mt-4'>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} className='d-flex align-items-center w-100 mt-4 mb-4'>
          <Heading/>
        </Link>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>
        <Link to="/add">
          <button style={{backgroundColor: '#d30f0f', color: '#fff'}} type="submit" class="btn"><i class="bi bi-plus"></i></button>
        </Link>
      </div>

      <div className="d-flex flex-row-reverse mb-6 me-5">
        {isNotLoggedIn && <Link to="/signin">
                  <button style={{ backgroundColor: '#e6c619', color: '#2b2410'}} type="submit" class="btn">Zaloguj</button>
        </Link>}

        {isNotLoggedIn && <Link to="/signup">
                  <button style={{ backgroundColor: '#e6c619', color: '#2b2410' }} type="submit" class="btn">Zarejestruj</button>
          </Link>}

              {!isNotLoggedIn && <a href="/" onClick={() => localStorage.removeItem('token')} style={{ backgroundColor: '#e6c619', color: '#2b2410'}} type="submit" class="btn">Wyloguj siê</a>}
      </div>

      <div className="row">
        <MovieList movies={movies}/>
      </div>
    </div>
  );
}

export default Home;
