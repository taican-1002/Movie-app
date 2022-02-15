import React from 'react';
import { useParams } from 'react-router-dom';

import { category as cate } from '../api/tmdbApi';

import PageHeader from '../components/page-header/PageHeader'
import MovieGrid from '../components/movie-grid/MovieGrid'

import Title from '../Title';

const Catalog = () => {

    const { category } = useParams();
    // console.log(cate)

    return (
        <Title title={category === 'movie' ? 'Movies' : 'TV Series'}>
            <PageHeader>
                { category === cate.movie ? 'Movies' : 'TV Series' }
            </PageHeader>   
            <div className='container'>
                <div className='section mb-3'>
                    <MovieGrid category={category}/>
                </div>
            </div>
        </Title>
    )
}

export default Catalog