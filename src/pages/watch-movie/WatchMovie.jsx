import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MovieList from "../../components/movie-list/MovieList";

import apiConfig from "../../api/apiConfig";
import tmdbApi, { category } from "../../api/tmdbApi";

import Title from "../../Title";

import "./watch-movie.scss";

const WatchMovie = () => {
  const [info, setInfo] = useState([]);
  console.log(info);
  const background = apiConfig.originalImage(
    info.poster_path || info.backdrop_path
  );

  const { id } = useParams();
  console.log(category.movie);

  useEffect(() => {
    const getInfo = (id) => {
      fetch(`${apiConfig.baseUrl}/movie/${id}?api_key=${apiConfig.apiKey}`)
        .then((res) => res.json())
        .then((data) => setInfo(data));
    };
    getInfo(id);
  }, [id]);

  return (
    <Title title={`${info.title || info.name} | Watch`}>
      <div
        className="watch-movie"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="container">
          <div className="watch-movie__wrap section mb-3">
            <div className="watch-movie__wrap__video section mb-3">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.2embed.org/embed/${id}`}
                title="Movie player"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="watch-movie__wrap__info section ">
              <h1 className="watch-movie__wrap__info__name">
                {info.title || info.name}
              </h1>
              <p className="watch-movie__wrap__info__overview">
                {info.overview}
              </p>
              <p className="watch-movie__wrap__info__release-date">
                Release Date: {info.release_date}
              </p>
              <p className="watch-movie__wrap__info__vote-average">
                {info.vote_average}
              </p>
            </div>
          </div>

          <div className="watch-movie__similar section">
            <h1 className="watch-movie__similar__title  mb-2">Similar</h1>
            <MovieList category={category.movie} type="similar" id={id} />
          </div>
        </div>
      </div>
    </Title>
  );
};

export default WatchMovie;
