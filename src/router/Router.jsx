import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Detail from '../pages/detail/Detail'

import WatchMovie from '../pages/watch-movie/WatchMovie'
import WatchTV from '../pages/watch-tv/WatchTV'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} exact/>
            <Route path='/:category' element={<Catalog />} />
            <Route path='/:category/search/:keyword' element={<Catalog />} />
            <Route path='/:category/:id' element={<Detail />} />
            
            <Route path='/watch/movie/:id' element={<WatchMovie />} />
            <Route path='/watch/tv/:id/season/:season/esp/:esp' element={<WatchTV />} />

        </Routes>
    )
}

export default Router