import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import Heading from './Head';

const Details = () => {

  const {id} = useParams();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [poster, setPoster] = useState();

  const fetchMovie = async (id) => {
    const url = 'https://pr-movies.herokuapp.com/api/movies/'+id;
    let response = await fetch(url);
    let responseJson = await response.json();
    setTitle(responseJson.title);
    setContent(responseJson.content);
    setPoster(responseJson.image);

  }

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  return(
    <div style={{textAlign: 'center', marginLeft: 120, marginRight: 120}} >

      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} className='d-flex align-items-center w-100 mt-4 mb-4'>
        <Heading/>
      </Link>

      <img src={poster} alt='movie' onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
              currentTarget.src ="https://fwcdn.pl/fpo/77/78/757778/7966011.6.jpg";
                                              }} width="300" height="400"/>
      <h1>{title}</h1>
      <h2>{content}</h2>

    </div>
  );
}

export default Details;
