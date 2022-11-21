import React from 'react';
import { Link } from 'react-router-dom'; 

import { OutlineButton } from '../components/button/Button';

import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';
import Title from '../Title'

import { category, movieType, tvType } from '../api/tmdbApi';

const Home = () => {
    return (
        <Title title='HOTPHIM'>
            {/* HERO SLIDE */}
            <HeroSlide />

            <div className='container'>
                {/* TRENDING MOVIE */}
                <div className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Trending Movies</h2>
                        <Link to='/movie'>
                            <OutlineButton className='small'>View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular} />
                </div>
                {/* TOP RATED MOVIE */}
                <div className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Top Rated Movies</h2>
                        <Link to='/movie'>
                            <OutlineButton className='small'>View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated} />
                </div>
                {/* TRENDING MOVIE */}
                <div className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Trending TV</h2>
                        <Link to='/tv'>
                            <OutlineButton className='small'>View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular} />
                </div>
                {/* TRENDING MOVIE */}
                <div className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Top Rated TV</h2>
                        <Link to='/tv'>
                            <OutlineButton className='small'>View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated} />
                </div>
            </div>
        </Title>
    )
}

export default Home