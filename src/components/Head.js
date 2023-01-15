import React from 'react';
import './Head.css';
import logo from '../img/logo.png';

const Head = () => {

  return (
		<div className='d-flex align-items-center w-100 mt-4 mb-4'>
      <img src={logo} alt='logo' width="200" height="200"/>
			
		</div>
	);
}

export default Head;
