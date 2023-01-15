import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Heading from './Head';
const axios = require('axios');

const Logowanie = () => {

    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    const [errorUsername, setErrorUsername] = useState();
    const [errorPassword, setErrorPassword] = useState();

    const signInUser = () => {
        console.log('login: ' + login);
        console.log('pass: ' + pass);

        if (login.trim() === '') {
            setErrorUsername('Wymagany login');
            return;
        } else {
            setErrorUsername();
        }

        if (pass.trim() === '') {
            setErrorPassword('Wymagane hasło');
            return;
        } else {
            setErrorPassword();
        }

        axios({
            method: 'post',
            url: 'https://pr-movies.herokuapp.com/api/user/auth',
            data: {
                login: login,
                password: pass
            }
        }).then((response) => {
            console.log(response);
            localStorage.setItem('token', response.data.token);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
            setErrorPassword('Podany login lub hasło są błędne')
        })
    };

    return (
        <div style={{ justifyContent: 'center', alignContent: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} className='d-flex align-items-center w-100 mt-4 mb-4'>
                <Heading />
            </Link>
            <div style={{ textAlign: 'center' }}>
                <h2> Logowanie </h2>
            </div>
            <form>
                <div class="form-group w-50 mt-4 mb-4">
                    <label for="loginInput">Login</label>
                    <input type="text" class="form-control" id="loginInput" placeholder="Login" onChange={(event) => setLogin(event.target.value)} value={login} />
                    {errorUsername &&
                        <div className="alert alert-danger">{errorUsername}</div>
                    }
                </div>
                <div class="form-group w-50 mt-4 mb-4">
                    <label for="passwordInput">Hasło</label>
                    <input type="password" class="form-control" id="passwordInput" placeholder="*****" onChange={(event) => setPass(event.target.value)} value={pass} />
                    {errorPassword &&
                        <div className="alert alert-danger">{errorPassword}</div>
                    }
                </div>
            </form>

            <button onClick={signInUser} style={{ backgroundColor: '#d30f0f', color: '#fff', marginTop: '20px' }} type="submit" class="btn">Zaloguj </button>

            <Link to="/">
                <button style={{ marginTop: '20px', marginLeft: '20px' }} type="button" class="btn btn-secondary">Wróć na stronę główną </button>
            </Link>

        </div>
    );
}

export default Logowanie;