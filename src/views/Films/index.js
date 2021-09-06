import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import PagePicker from "../../components/PagePicker";

const Films = () => {
    const [films, setFilms] = useState([])
    const [page, setPage] = useState(1)
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/movie?page=${page}&language=ru&sort_by=popularity.desc&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => setFilms(data.results))

    }, [page])
    return (
        <div>
           <PagePicker page={page} setPage={setPage} />
            <div className="row my-4">
                {
                    films.map(film =>
                        <div key={film.id} className="col-md-2 col-sm-6 mb-3">
                            <Link to={`/film/${film.id}`} >
                                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_bestv2${film.poster_path}`} alt={film.title} />
                                <h5>{film.title}</h5>
                            </Link>
                        </div>

                    )
                }
            </div>
        </div>
    );
};

export default Films;