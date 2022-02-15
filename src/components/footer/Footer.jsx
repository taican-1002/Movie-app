import React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';

import bg from '../../assets/footer-bg.jpg'
import logo from '../../assets/logo.png'

import github from '../../assets/github.png'
import facebook from '../../assets/facebook.png'

const Footer = () => {
    return (
        <div className='footer' style={{ backgroundImage: `url(${bg})`}}>
            <div className='footer__content container'>
                <div className='footer__content__logo'>
                    <img src={logo} alt=''/>
                    <Link to='/'>HOTPHIM</Link>
                </div>
                <div className='footer__content__menu'>
                    <div className='footer__content__menu__item'>
                        <Link to='/'>Home</Link>
                        <Link to='/'>Contact us</Link>
                        <Link to='/'>Term of servies</Link>
                        <Link to='/'>About us</Link>
                    </div>
                    <div className='footer__content__menu__item'>
                        <Link to='/'>Live</Link>
                        <Link to='/'>FAQ</Link>
                        <Link to='/'>Premium</Link>
                        <Link to='/'>Privacy policy</Link>
                    </div>
                    <div className='footer__content__menu__item'>
                        <Link to='/'>You must watch</Link>
                        <Link to='/'>Recent release</Link>
                        <Link to='/'>Top IMDB</Link>
                    </div>
                    <div className='footer__content__menu__item'>
                        <p>Contact</p>
                        <a href='https://github.com/taican-1002' target='_blank'>
                            <img src={github} alt='github'/>
                        </a>
                        <a href='https://www.facebook.com/taican.real/' target='_blank'>
                            <img src={facebook} alt='facebook'/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer