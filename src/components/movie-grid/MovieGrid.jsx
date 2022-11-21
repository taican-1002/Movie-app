import React, { useState, useEffect, useCallback} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input'

import tmdbApi, { category, movieType, tvType} from '../../api/tmdbApi';


const MovieGrid = props => {

    const [item, setItem] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();
    // console.log(keyword) keyword === undefined

    //Xử lý render movies list - upcoming & tv list - ontheair
    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch(props.category){
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.on_the_air, {params});
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, {params})
            }
            setItem(response.results);
            setTotalPage(response.total_pages)
        }
        getList();
    },[props.category, keyword]);

    //Xử lý nút Loadmore
    const loadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.on_the_air, {params});
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, {params});
        }
        // console.log(item, response.results) //item: 20, response.results: 20
        setItem([...item, ...response.results]);
        setPage(page + 1);
    }


    return (
        <>
            <div className='section mb-3'>
                <MovieSearch category={props.category} keyword={keyword}/>
            </div>
            <div className='movie-grid'>
            {
                item.map((item,index) => (
                    <MovieCard item={item} key={index} category={props.category}/>
                ))
            }
            </div>
            {
                page < totalPage ? (
                    <div className='movie-grid__loadmore'>
                        <OutlineButton className='small' onClick={loadMore}>Load More</OutlineButton>
                    </div>
                ) : null
            }
        </>
    );
}

//Movie search
const MovieSearch = props => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                navigate(`/${category[props.category]}/search/${keyword}`)
            }
        },
        [keyword, props.category, navigate]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        }
    },[keyword, goToSearch])

    return (
        <div className='movie-search'>
            <Input 
                type='text'
                placeholder='Enter keyword'
                value = {keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className='small' onClick={goToSearch}>Search</Button>  
        </div>
    )

}

export default MovieGrid