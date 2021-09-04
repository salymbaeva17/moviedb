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
            <div className="col-md-6">
                <h3>Актерский состав:</h3>
                {
                    actors.map(actor =>
                        <div className="row">
                            <div className="col-md-4">
                                <Link to={`/actor/${actor.id}`}>
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
                                </Link>
                            </div>
                            <div className="col-md-8">
                                <h5>{actor.name}</h5>
                                <span>{actor.character}</span>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="col-md-6">
                <h3>Съёмочный состав:</h3>
                {
                    productionCast.map(person =>
                        <div key={person.id} className="row">
                            <Link className="col-md-4" to={`/actor/${person.id}`}>
                                <div >
                                    {person.profile_path === null || person.profile_path?.includes("null") ?
                                        person.gender === 1 || person.gender === 0 ?
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
                            </Link>
                            <div className="col-md-8">
                                <h5>{person.name}</h5>
                                <span>{person.character}</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FilmsCast;