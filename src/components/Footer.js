import React from 'react';
import { Link } from 'react-router-dom';
import bgFooter from '../assets/images/footer.jpg'

function Footer() {
  return (
    <div className=' footer' style={{backgroundImage:`url(${bgFooter})`}}>
        <div className='footer-link'>
            <Link className='text-link' to="/">Home</Link>
            <Link className='text-link' to="/">Movies</Link>
            <Link className='text-link' to="/">TV Series</Link>
        </div>
        <div className='footer-link'>
            <Link className='text-link' to="/">Live</Link>
            <Link className='text-link' to="/">FAQ</Link>
            <Link className='text-link' to="/">Premium</Link>
            <Link className='text-link' to="/">Privacy policy</Link>
        </div>
        <div className='footer-link'>
            <Link className='text-link' to="/">You must watch</Link>
            <Link className='text-link' to="/">Recent release</Link>
            <Link className='text-link' to="/">Top IMDB</Link>
        </div>
    </div>
  );
}

export default Footer;
