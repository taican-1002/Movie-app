import React, { useState, useEffect, useRef} from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import { useNavigate } from 'react-router-dom';

import './hero-slide.scss'

import Button, { OutlineButton } from '../button/Button'
import Modal, { ModalContent } from '../modal/Modal';

const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [moviesItem, setMoviesItem] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 5}
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params});
                setMoviesItem(response.results.slice(1,4));
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();
    },[])

    return (
        <div className='hero-slide'>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 3000}}
            >
                {
                    moviesItem.map((item, index) => (
                        <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                        )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                moviesItem.map((item,index) => <TrailerModal key={index} item={item} />)
            }
        </div>
    )
}



const HeroSlideItem = props => {
    //Lấy url
    const navigate = useNavigate();

    const item = props.item;
    // console.log(item)
    //Background của hero-slide
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poser_path);

    const setModalActive = async () => {
        //Selector element có id là #modal_${item.id}
        const modal = document.querySelector(`#modal_${item.id}`);
        //Get video từ tmdbApi.getVideos gồm thể loại là movie và id
        const videos = await tmdbApi.getVideos(category.movie, item.id);
        // console.log(videos)
        
        if (videos.results.length > 0) {
            //Url video trailer
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            //Selector thẻ iframe là con trực tiếp của class modal__content và gán
            // src bằng biến videoSrc
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('modal__content').innerHTML = 'No Trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style= {{ backgroundImage: `url(${background})` }}
        >
            <div className='hero-slide__item__content container'>
                <div className='hero-slide__item__content__info'>
                    <h2 className='title'>{item.title}</h2>
                    <div className='overview'>{item.overview}</div>
                    <div className='btns'>
                        <Button onClick={() => navigate('/movie/' + item.id)}>
                            Watch Movie Detail
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch Trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className='hero-slide__item__content__poster'>
                    <img src={apiConfig.w500Image(item.poster_path)} alt=''/>
                </div>
            </div>
        </div>
    )
}


const TrailerModal = props => {
    // console.log(props)
    const item = props.item;
    // console.log(item)

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    const onCloseModal = () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        modal.classList.remove('active')
    }

    return (
        <Modal active={false} id={`modal_${item.id}`} onClick={onCloseModal}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width='100%' height='500px' title='trailer'></iframe>
            </ModalContent>
        </Modal>
    )
}


export default HeroSlide;