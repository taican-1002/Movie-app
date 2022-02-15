import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import { SwiperSlide, Swiper } from 'swiper/react';

import MovieCard from '../movie-card/MovieCard'

import tmdbApi, { category } from '../../api/tmdbApi'

import './movie-list.scss'

const MovieList = props => {

    const [item, setItem] = useState([]);
    // console.log(item)

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};
            
            //Nếu type khác similar thì lấy movielist hoặc tvlist ngược lại
            //thì lấy similar
            if (props.type !== 'similar'){
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {params});
                        break;
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItem(response.results);
        }
        getList();
    },[]);

    return (
        <div className='movie-list'>
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
                autoplay={{delay: 3000}}
            >
                {
                    item.map((item,index) => (
                        <SwiperSlide key={index}>
                            <MovieCard item={item} category={props.category}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default MovieList