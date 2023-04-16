import React from 'react';
import './Footer.css';

export default function Footer() {
  let year = new Date();
  return (
    <div>
      <div className='spacer layer'></div>
      <footer className='footer'>
        <div className='footerMain'>
          <p>Developed by Gordon Zam</p>
          <p>Copyright &#169; {year.getFullYear()}</p>
          <p>
            <a
              href='https://www.flaticon.com/free-icons/verified'
              title='verified icons'
              target='blank'
            >
              icon by Moudesain - Flaticon
            </a>
          </p>
        </div>
        <a href='https://linkedin.com' target='blank' className='linkedin'>
          Linkedin
        </a>
      </footer>
    </div>
  );
}
