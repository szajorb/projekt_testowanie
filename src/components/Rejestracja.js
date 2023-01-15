import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Heading from './Head';
import validator from 'validator';
const axios = require('axios');

const Rejestracja = () => {

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passRep, setPassRep] = useState('');

    const [errorLogin, setErrorLogin] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();

    const [info, setInfo] = useState();

    const signUpUser = () => {
        console.log('login: ' + login);
        console.log('email: ' + email);
        console.log('pass: ' + pass);
       

        if (login.trim() === '') {
            setErrorLogin('Wymagany login!');
            return;
        } else {
            setErrorLogin();
        }

        if (email.trim() === '') {
            setErrorEmail('Wymagany adres email!');
            return;
        } else if (!validator.isEmail(email)) {
            setErrorEmail('Adres email niepoprawny!')
            return;
        } else {
            setErrorEmail();
        }

        if (pass === '') {
            setErrorPassword('Wymagane hasło!');
            return;
        } else {
            setErrorPassword();
        }

        

        axios({
            method: 'post',
            url: 'https://pr-movies.herokuapp.com/api/user/create',
            data: {
                name: login,
                email: email,
                password: pass
            }
        }).then((response) => {
            console.log(response);
            setInfo('Rejestracja przebiegła pomyślnie :)');
        }).catch((error) => {
            console.log(error);
            setErrorPassword('Podany login lub e-mail zajęty!');
        })
    };

    return (
        <div>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} className='d-flex align-items-center w-100 mt-4 mb-4'>
                <Heading />
            </Link>
            <div style={{ textAlign: 'center' }}>
                <h2> Rejestracja </h2>
            </div>

            <div class="form-group w-50 mt-4 mb-4">
                <label for="emailInput">E-mail</label>
                <input aria-describedby="emailHelp" type="email" class="form-control" id="emailInput" placeholder="name@example.com" onChange={(event) => setEmail(event.target.value)} value={email} />
                {errorEmail &&
                    <div className="alert alert-danger">{errorEmail}</div>
                }
            </div>


            <div class="form-group w-50 mt-4 mb-4">
                <label for="loginInput">Login</label>
                <input type="text" class="form-control" id="loginInput" placeholder="Login" onChange={(event) => setLogin(event.target.value)} value={login} />
                {errorLogin &&
                    <div className="alert alert-danger">{errorLogin}</div>
                }
            </div>


            <div class="form-group w-50 mt-4 mb-4">
                <label for="passwordInput">Hasło</label>
                <input type="password" class="form-control" id="passwordInput" placeholder="*****" onChange={(event) => setPass(event.target.value)} value={pass} />
            </div>


            <button style={{ backgroundColor: '#d30f0f', color: '#fff', marginTop: '20px' }} type="submit" class="btn" onClick={signUpUser}>Zarejestruj mnie</button>

            <Link to="/">
                <button style={{ marginTop: '20px', marginLeft: '20px' }} type="button" class="btn btn-secondary">Powrót</button>
            </Link>

        </div>
    );
}

export default Rejestracja;
