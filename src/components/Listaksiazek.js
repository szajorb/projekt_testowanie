import React from 'react';
import './Listaksiazek.css';

import { Link } from "react-router-dom";

const Listaksiazek = (props) => {
    return (
        <>
            {props.movies.map((book, index) => (
                <div className="d-flex justify-content-center m-3 col">

                    <Link to={`/details/${book.id}`}>
                        <div class="img__wrap">
                            <img class="img__img" src={book.image} onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "https://fwcdn.pl/fpo/77/78/757778/7966011.6.jpg";
                            }} alt='book' width="300" height="400" />
                            <p class="img__description">{book.content}</p>
                        </div>
                    </Link>

                </div>
            ))}
        </>
    );
};

export default Listaksiazek;

