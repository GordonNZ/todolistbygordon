import React from 'react';
import './Header.css';
import heroimg from '../../assets/Completed task _Isometric.svg';

export default function Header() {
  return (
    <div className='header'>
      <h1 className='headH1'>Welcome to myToDoList!</h1>
      <p className='headP'>
        This is a to do app made by me - Gordon, using React.js
      </p>
      <img
        className='heroImg'
        src={heroimg}
        alt='person with completed task document'
      ></img>
      <p className='pBottom'>I hope you enjoy your time here!</p>
    </div>
  );
}
