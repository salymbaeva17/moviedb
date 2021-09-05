import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const FilmsTrailer = () => {
    const params = useParams()
    const [trailer, setTrailer] = useState()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}/videos?language=ru&sort_by=popularity.desc&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setTrailer(data.results)
            })
    }, [params.id])
    console.log(trailer)
    return (
        <div>

        </div>
    );
};

export default FilmsTrailer;