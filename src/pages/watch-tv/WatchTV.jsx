import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import MovieList from '../../components/movie-list/MovieList'


import tmdbApi, { category } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import './watch-tv.scss'
import Title from '../../Title';

const WatchTV = () => {
    const { esp, season, id } = useParams();

    const [item, setItem] = useState([])

    const [seasonTv, setSeasonTv] = useState([]);
    const [espTv, setEspTv] = useState([]);
    
    const [seasonData, setSeasonData] = useState([]);
    const [espData, setEspData] = useState([]);
    
    const [seasonCurrent, setSeasonCurrent] = useState();
    const [espCurrent, setEspCurrent] = useState();
    
    const [nameTv, setNameTv] = useState();

    // console.log(item)
    
    //Scroll To Top
    const scrollToTop = () => {
        window.scrollTo(0,0);
    }

    //Set espTv & seasonTv
    useEffect(() => {
        setEspTv(esp);
        setSeasonTv(season);
    },[esp,season]);

    //set Info: seasonData & nameTv
    useEffect(() => {
        const getInfo = (id) => {
            fetch(`${apiConfig.baseUrl}/tv/${id}?api_key=${apiConfig.apiKey}`)
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data)
                    setSeasonData(data.seasons)
                    setNameTv(data.name)
                    setItem(data)
                });
        }
        getInfo(id);
    },[id]);

    //Set espCurrent
    useEffect(() => {
        const getEspCurrent= (id, season, esp) => {
            fetch(
                `${apiConfig.baseUrl}/tv/${id}/season/${season}/episode/${esp}?api_key=${apiConfig.apiKey}`
            )
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data)
                    setEspCurrent(data)
                })
                .catch((err) => console.log(err))
        }
        getEspCurrent(id, season, esp);
    },[id, season, esp]);


//Get esp & setEspData & setSeasonCurrent
const getEsp = (season, id) => {
    setEspData([]);

    fetch(`${apiConfig.baseUrl}/tv/${id}/season/${season}?api_key=${apiConfig.apiKey}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            setEspData(data.episodes)
            setSeasonCurrent(data.season_number)
        })
}

const background = apiConfig.originalImage(item.poster_path || item.backdrop_path);

    return (
        <Title title={`${nameTv} | Season ${season} | Episode ${esp}`}>
            <div className='watch-tv' style={{ backgroundImage: `url(${background})` }}>
                <div className='container watch-tv__wrap'>
                    <div className='watch-tv__left section mb-3'>
                        {/* WATCH TV VIDEO */}
                        <div className='watch-tv__video mb-3'>
                            <iframe
                                width={"100%"}
                                height={"100%"}
                                src={`https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${seasonTv}&e=${espTv}`}
                                frameBorder="0"
                                title="tvShow"
                                className="watch-tv-iframe"
                                allowFullScreen
                                />
                        </div>
                        {/* WATCH TV INFO */}
                        <div className='watch-tv__info'>
                            {/* TITLE */}
                            <h1 className='watch-tv__info__title'>{nameTv}</h1>
                            {/* SEASON NUMBER */}
                            <p className='watch-tv__info__season-number'>
                                Season {espCurrent?.season_number}
                            </p>
                            {/* EPISODE NUMBER */}
                            <p className='watch-tv__info__episode-number'>
                                Episode {espCurrent?.episode_number}
                            </p>
                            {/* EPISODE NAME */}
                            <p className='watch-tv__info__episode-name'>
                                Name: {espCurrent?.name}
                            </p>
                            {/* OVERVIEW */}
                            <p className='watch-tv__info__overview'>
                                Overview: {espCurrent?.overview}
                            </p>
                            {/* AIR DATE */}
                            <p className='watch-tv__info__air-date'>
                                Air Date: {espCurrent?.air_date}
                            </p>
                        </div>
                    </div>

                    <div className='watch-tv__right section mb-3'>
                        <div className='watch-tv__other'>
                            {
                                seasonData.map(item => (
                                    <div 
                                        className='watch-tv__other__season'
                                        onClick={() => getEsp(item.season_number, id)}
                                        key={item.id}
                                    >
                                        {/* SEASON ITEM */}
                                        <div className='watch-tv__other__season__item'>
                                            <img 
                                                className='watch-tv__other__season__item__img'
                                                src={
                                                    item.poster_path || item.backdrop_path
                                                    ? `${apiConfig.w500Image(item.poster_path || item.backdrop_path)}`
                                                    : 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'
                                                }
                                                alt={item.name}
                                            />
                                            <div className='watch-tv__other__season__item__info'>
                                                <p className='watch-tv__other__season__item__info__name'>
                                                    {item.name}
                                                </p>
                                                <p className='watch-tv__other__season__item__info__esp-count'>
                                                    {item.episode_count} episode
                                                </p>
                                            </div>
                                        </div>
                                        {/* SEASON ESP */}
                                        <div className='watch-tv__other__season__esp'>
                                            {
                                                item.season_number === seasonCurrent
                                                ? espData.map(esp => (
                                                    <NavLink
                                                        activeClassName='active'
                                                        to={`/watch/tv/${id}/season/${seasonCurrent}/esp/${esp.episode_number}`}
                                                        className='watch-tv__other__season__esp__list'
                                                        key={esp.id}
                                                        onClick={scrollToTop}
                                                    >   
                                                        <div className='watch-tv__other__season__esp__item'>
                                                            <img
                                                                src={
                                                                    esp.still_path
                                                                    ? `${apiConfig.w500Image(esp.still_path)}`
                                                                    : 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'
                                                                }
                                                                className='watch-tv__other__season__esp__item__img'
                                                                alt={esp.name}
                                                            />
                                                            <p className='watch-tv__other__season__esp__item__name'>
                                                                Episode {esp.episode_number}
                                                            </p>
                                                        </div>
                                                    </NavLink>
                                                )) : null
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className='watch-tv__similar section'>
                    <h1 className='watch-movie__similar__title  mb-2'>Similar</h1>
                    <MovieList category={category.tv} type='similar' id={id}/>
                 </div>
            </div>
        </Title>
    )
}

export default WatchTV