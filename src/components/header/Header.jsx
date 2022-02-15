import React, { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png'

import './header.scss'

const headerNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movie',
    },
    {
        display: 'TV Series',
        path: '/tv',
    },
]

const Header = () => {

    const { pathname } = useLocation();
    const active = headerNav.findIndex(e => e.path === pathname)

    const headerRef = useRef(null);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        }
    })

    return (
        <div className='header' ref={headerRef}>
            <div className='header__wrap container'>
                <div className='header__logo'>
                    <img src={logo} alt='' />
                    <Link to='/'>HOTPHIM</Link>
                </div>
                <ul className='header__nav'>
                    {
                        headerNav.map((item,index) => (
                            <li key={index} className={`${index === active ? 'active' : ''}`}>
                                <Link to={item.path}>
                                    {item.display}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header