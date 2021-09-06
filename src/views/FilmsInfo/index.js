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

            <div style={{backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${film.backdrop_path})`}} className="backdrop back"  >
               <div className="container">
                   <div className="row padding-top">
                       <div className="col-md-3 padding-bottom">
                           <img className="rounded-3" src={`https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`} alt={film.title}/>
                       </div>
                       <div className="col-md-9 padding-bottom text-white max-width film">
                           <h2 className="film__title">{film.title}</h2>
                           <span className="film__release-date">{film.release_date.toString().split("-").reverse().join("/")} ({film.production_countries[0]?.iso_3166_1})</span>
                           {
                               film.genres?.map((genre, idx) =>
                                   <span key={idx} className="mx-2 film__genre">{genre.name}</span>
                               )
                           }
                           <span className="film__runtime">{ Math.floor(film.runtime / 60) > 0 ?` ${Math.floor(film.runtime / 60)}h ${film.runtime % 60}min` : `${film.runtime % 60}min`}</span>
                           <p className="film__tagline">{film.tagline}</p>
                           <p className="film__review">Описание: {film.overview}</p>
                           <p className="film__rating">Рейтинг: {film.vote_average}</p>
                           <span className="film__production">Производители:</span>
                           {
                               film.production_companies.map((company, idx) =>
                                   <span className="ms-2 film__production-company" key={idx}>{company.name}</span>)
                           }
                           <p className="film__country">Страна:
                               {film.production_countries.map((country, idx) =>
                                   <span className="ms-2" key={idx}>{country.name}</span>)
                               }</p>
                       </div>
                           <div className="col-md-9 mt-5 pt-3">
                               <Actors setActorsLoading={setActorsLoading}/>
                               {
                                   trailers.map(el =>
                                       <FilmsTrailer key={el.id} id={el.key}/>
                                   )
                               }
                           </div>
                           <div className="col-md-3 mt-5 pt-3">
                               <h3>Факты</h3>
                               <p>Бюджет: ${film.budget?.toLocaleString()}</p>
                               <p>Доход: ${film.revenue?.toLocaleString()}</p>


                               <p>Оригинальный язык: {language[film.original_language]}</p>
                           </div>
                   </div>
               </div>
        </div>
    )

}

export default FilmsInfo;