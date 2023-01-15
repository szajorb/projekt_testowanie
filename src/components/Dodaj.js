import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Heading from './Head';
const axios = require('axios');

const Dodaj = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [errorTitle, setErrorTitle] = useState();
  const [errorDescription, setErrorDescription] = useState();
  const [errorImage, setErrorImage] = useState();
  const [info, setInfo] = useState();

  const addFilm = () => {

    if(title.trim() === '') {
      setErrorTitle('Podaj tytuł filmu!');
      return;
    } else {
      setErrorTitle();
    }

    if (description.trim() === '') {
      setErrorDescription('Podaj opis filmu!');
      return;
    } else if (description.trim().length < 10) {
      setErrorDescription('Opis zbyt krótki!');
      return;
    } else {
      setErrorDescription();
    }

    if (imageUrl.trim() === '') {
      setErrorImage('Podaj link do zdjęcia!');
      return;
    } else {
      setErrorImage();
    }

    console.log('title: ' + title);
    console.log('description: ' + description);
    console.log('imageUrl: ' + imageUrl);


    axios({
      method: 'post',
      url: 'https://pr-movies.herokuapp.com/api/movies',
      data: {
        title: title,
        image: imageUrl,
        content: description
      }
    }).then((response) => {
      console.log(response);
      setInfo('Film dodany pomyślnie :)')
    }).catch((error) => {
      console.log(error);
    })

  };

  return (
    <div>

      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} className='d-flex align-items-center w-100 mt-4 mb-4'>
        <Heading/>
      </Link>

      <div style={{padding: '50px'}}>
        <div style={{textAlign: 'center'}}>
          <h2> Dodawanie filmu </h2>
        </div>

        <form>
          <div class="form-group w-50 mt-4 mb-4">
            <label for="titleInput">Tytuł filmu</label>
            <textarea rows="1" class="form-control" id="titleInput" placeholder="Tytuł" onChange={(event) => setTitle(event.target.value)} value={title}/>
            {errorTitle &&
              <div className="alert alert-danger">{errorTitle}</div>
            }
          </div>

          <div class="form-group w-50  mt-4 mb-4">
            <label for="directorInput">Opis</label>
            <textarea rows="3" class="form-control" id="descriptionInput" placeholder="Opis" onChange={(event) => setDescription(event.target.value)} value={description}/>
            {errorDescription &&
              <div className="alert alert-danger">{errorDescription}</div>
            }
          </div>

          <div class="form-group w-50  mt-4 mb-4">
            <label for="actorsInput">Zdjęcie</label>
            <textarea rows="1" class="form-control" id="imageUrlInput" placeholder="Link do zdjęcia" onChange={(event) => setImageUrl(event.target.value)} value={imageUrl}/>
            {errorImage &&
              <div className="alert alert-danger">{errorImage}</div>
            }
            {info &&
              <div className="alert alert-info">{info}</div>
            }
          </div>
        </form>
        <button onClick={addFilm} style={{backgroundColor: '#d30f0f', color: '#fff', marginTop: '20px'}} type="submit" class="btn">Dodaj</button>

        <Link to="/">
          <button style={{marginTop: '40px', marginLeft: '30px'}} type="button" class="btn btn-secondary">Powrót</button>
        </Link>

      </div>

    </div>
  );
}

export default Dodaj;
