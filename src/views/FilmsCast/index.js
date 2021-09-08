import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner";

const FilmsCast = () => {
    const [actors, setActors] = useState([])
    const [productionCast, setProductionCast] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?&language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setActors(data.cast)
                setProductionCast(data.crew)
                setIsLoading(false)
            })

    }, [params.id])
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <div className="row">
            <div className="col-md-6 ">
                <h3>Актерский состав ({actors.length})</h3>
                {
                    actors.map(actor =>
                        <Link to={`/actor/${actor.id}`} className="row cast__card w-100">
                                <div  className="col-md-2 cast__image" >
                                    {actor.profile_path === null || actor.profile_path?.includes("null") ?
                                        actor.gender === 1 || actor.gender === 0 ?
                                            <>
                                                <img
                                                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg"
                                                    alt="user-grey"/>
                                            </>
                                            :
                                            <>
                                                <img
                                                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                                                    alt="user-grey"/>
                                            </> :
                                        <>
                                            <img
                                                src={`https://www.themoviedb.org/t/p/w276_and_h350_face${actor.profile_path}`}
                                                alt={actor.name}/>

                                        </>
                                    }
                                </div>
                            <div className="col-md-8 cast__info">
                                <h5 className="cast__name">{actor.name}</h5>
                                <span className="cast__character">{actor.character}</span>
                            </div>
                        </Link>
                    )
                }
            </div>
            <div className="col-md-6">
                <h3>Съёмочный состав ({productionCast.length})</h3>
                {
                    productionCast.map(person =>
                        <Link to={`/actor/${person.id}`} key={person.id} className="row cast__card">
                            <div className="col-md-2 cast__image" >
                                    {person.profile_path === null || person.profile_path?.includes("null") ?
                                        person.gender === 1?
                                            <>
                                                <img
                                                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg"
                                                    alt="user-grey"/>
                                            </>
                                            :
                                            <>
                                                <img
                                                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                                                    alt="user-grey"/>
                                            </> :
                                        <>
                                            <img
                                                src={`https://www.themoviedb.org/t/p/w276_and_h350_face${person.profile_path}`}
                                                alt={person.name}/>

                                        </>
                                    }
                            </div>
                            <div className="col-md-8 cast__info">
                                <h5 className="cast__name">{person.name}</h5>
                                <span className="cast__character">{person.known_for_department}</span>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default FilmsCast;