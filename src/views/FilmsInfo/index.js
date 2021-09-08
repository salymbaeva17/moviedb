import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Spinner from "../../components/Spinner";
import Actors from "../../components/Actors";
import {language} from "../../components/Langs";
import FilmsTrailer from "../../components/FilmsTrailer";

const FilmsInfo = () => {
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [actorsLoading, setActorsLoading] = useState(true)
    const [film, setFilm] = useState({})
    const [trailers, setTrailers] = useState([])

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}?language=ru&sort_by=popularity.desc&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setFilm(data)
                setIsLoading(false)
            })

        axios(`https://api.themoviedb.org/3/movie/${params.id}/videos?sort_by=popularity.desc&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setTrailers(data.results)
            })
    }, [params.id])
    console.log(trailers)
    if (isLoading && actorsLoading) {
        return <Spinner/>
    }
    return (
        <div
            style={{backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${film.backdrop_path})`}}
            className="backdrop back">
            <div className="container">
                <div className="row padding-top">
                    <div className="d-flex row flex-direction-row align-items-center">
                        <div className="col-md-3 padding-bottom">
                            <img className="rounded-3"
                                 src={`https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`}
                                 alt={film.title}/>
                        </div>
                        <div className="col-md-9 padding-bottom text-white max-width film">
                            <h2 className="film__title">{film.title} <span>({film.release_date.slice(0, 4)})</span></h2>
                            <span
                                className="film__release-date me-2">{film.release_date.toString().split("-").reverse().join("/")} ({film.production_countries[0]?.iso_3166_1})</span>
                            {
                                film.genres?.map((genre, idx) =>
                                    <span key={idx} className="mx-2 film__genre">{genre.name}</span>
                                )
                            }
                            <span
                                className="film__runtime ms-2">{film.runtime !== null ? Math.floor(film.runtime / 60) > 0 ? ` ${Math.floor(film.runtime / 60)}h ${film.runtime % 60}min` : `${film.runtime % 60}min` : "－"}</span>
                            <p className="film__tagline mt-2">{film.tagline}</p>
                            <p className="film__review">Обзор</p>
                            <p>{film.overview}</p>
                            <p className="film__rating">Рейтинг: {film.vote_average}</p>
                            {
                                film.production_companies.map(company =>
                                    <span key={company.id}
                                          className="me-3 film__production-company">{company.name}</span>)
                            }
                            {
                                film.production_countries.map(item => item).length > 1 ?
                                    <span className="film__country">Страны:</span> :
                                    film.production_countries.length === 0 ? "" :
                                        <span className="film__country">Страна:</span>
                            } {film.production_countries.map((country, idx) =>
                            <span className="ms-2" key={idx}>{country.name}</span>)
                        }

                        </div>
                    </div>
                    <div className="col-md-9 mt-5 pt-3">
                        <Actors setActorsLoading={setActorsLoading}/>
                        <div className="my-5">
                            {
                                trailers.map(el =>
                                    <FilmsTrailer key={el.id} id={el.key}/>
                                )
                            }
                        </div>

                    </div>
                    <div className="col-md-3 mt-5 pt-3">
                        <h3>Факты</h3>
                        <p>Исходное название: <span>{film.original_title}</span></p>
                        <p>Статус: {
                            film.status === "Released" ? "Выпущено" : "－"
                        }</p>
                        <p>Бюджет: {
                            film.budget ? <span>${film.budget.toLocaleString()}</span> : "－"
                        }</p>
                        <p>Сборы: {
                            film.revenue ? <span>${film.revenue.toLocaleString()}</span> : "－"
                        }</p>
                        <p>Оригинальный язык: {language[film.original_language]}</p>
                    </div>
                </div>
            </div>
        </div>



    )

}

export default FilmsInfo;