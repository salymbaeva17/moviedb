import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Films = () => {
    const [films, setFilms] = useState([])
    const [page, setPage] = useState(1)
    const handlePage = (item) => {
        setPage(item)
    }
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/movie?page=${page}&language=ru&sort_by=popularity.desc&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => setFilms(data.results))

    }, [page])
    return (
        <div>
            {
                [...Array(6).keys()].map(item =>
                    <button key={item} className={`btn btn-primary mx-1 ${page === item + 1 && `btn-info text-white`}`} type="button" onClick={() => handlePage(item + 1)}>{item + 1}</button>
                )
            }
            <div className="row my-4">
                {
                    films.map(film =>
                        <div className="col-md-3 col-sm-6 mb-3">
                            <Link to={`/film/${film.id}`} key={film.id} >
                                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_bestv2${film.poster_path}`} alt={film.title} />
                                <h5>{film.original_title}</h5>
                            </Link>
                        </div>

                    )
                }
            </div>
        </div>
    );
};

export default Films;