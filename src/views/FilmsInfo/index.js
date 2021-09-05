import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, useHistory} from "react-router-dom";
import Spinner from "../../components/Spinner";
import Actors from "../../components/Actors";

const FilmsInfo = () => {
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [film, setFilm] = useState({})
    const [actors, setActors] = useState([])
    const history = useHistory()
    const getActors = () => {
        history.push(`/cast/${params.id}`)
    }

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}?language=ru&sort_by=popularity.desc&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setFilm(data)
                setIsLoading(false)
            })
        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?language=ru&sort_by=popularity.desc&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setActors(data.cast)
            })
    }, [params.id])
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <div className="row">
            <div className="col-md-4">
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`} alt={film.title}/>
            </div>
            <div className="col-md-8">
                <h2>{film.title}</h2>
                <span>{film.release_date.toString().split("-").reverse().join("/")} ({film.production_countries[0]?.iso_3166_1})</span>
                {
                    film.genres?.map(genre =>
                        <span className="mx-2">{genre.name}</span>
                    )
                }
                <p>{film.tagline}</p>
                <p>Описание: {film.overview}</p>
                <p>Рейтинг: {film.vote_average}</p>
                <p>Бюджет: ${film.budget?.toLocaleString()}</p>
                <p>Доход: ${film.revenue?.toLocaleString()}</p>
                <div>Производители: {
                    film.production_companies.map(company =>
                        <div key={company.id}>{company.name}</div>)
                }</div>
                <span>Страна:</span>
                {
                    film.production_countries.map(country =>
                        <div key={country.id}>{country.name}</div>
                    )
                }
                <h4>Язык</h4>
            </div>
            <Actors actors={actors}/>
            <div>
                <button className='btn-actors' onClick={getActors}>Смотреть ещё <i className='bx bx-right-arrow-alt'/>
                </button>
            </div>
        </div>
    )

}

export default FilmsInfo;