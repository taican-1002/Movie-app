import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import tmdbApi, { movieType, tvType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import CastList from './CastList'
import VideoList from './VideoList'

import MovieList from '../../components/movie-list/MovieList'
import Button, { OutlineButton } from '../../components/button/Button'

import Title from '../../Title'

import './detail.scss'

const Detail = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getDetail = async () => {
            const params = {};
            const response = await tmdbApi.detail(category, id, {params});
            // console.log(response)
            setItem(response);
            window.scrollTo(0, 0);
        }
        getDetail();
    },[category, id])
    
    return (
        <>
            {
                item && (
                    <Title title={`${item.name || item.title}`}>
                        {/* BANNER */}
                        <div className='banner' style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        {/* MOVIE CONTENT */}
                        <div className='movie-content container mb-3'>
                            {/* MOVIE CONTENT POSTER */}
                            <div className='movie-content__poster'>
                                <div className='movie-content__poster__img' style={{ backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})` }}></div>
                            </div>
                            {/* MOVIE CONTENT INFO */}
                            <div className='movie-content__info'>
                                {/* TITLE */}
                                <h1 className='title'>{item.title || item.name}</h1>
                                {/* GENRES */}
                                <div className='genres'>
                                    {
                                        item.genres && item.genres.slice(0,5).map((genre,index) => (
                                            <span key={index} className='genres__item'>{genre.name}</span>
                                        ))
                                    }
                                </div>
                                {/* OVERVIEW */}
                                <p className='overview'>{item.overview}</p>
                                {/* CASTS LIST */}
                                <div className='cast'>
                                    <div className='section__header'>
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id}/>
                                </div>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <div className='movie-content__btn section mb-3'>
                            <Button onClick={category === 'movie' 
                                            ? () => navigate('/watch/movie/' + item.id)
                                            : () => navigate('/watch/tv/' + item.id +'/season/1/esp/1')
                            }>
                                Watch Now
                            </Button>
                        </div>
                        {/* VIDEO LIST & SIMILAR */}
                        <div className='container'>
                            <div className='section mb-3'>
                                    <VideoList id={item.id} />
                            </div>
                            <div className='section mb-3'>
                                <div className='section__header mb-2'>
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type='similar' id={item.id}/>
                            </div>
                        </div>
                    </Title>
                )
            }
        </>
    )
}

export default Detail