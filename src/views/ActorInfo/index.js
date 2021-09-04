import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import Spinner from "../../components/Spinner";

const ActorInfo = () => {
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [actor, setActor] = useState({})
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${params.id}?api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setActor(data)
                setIsLoading(false)
            })
    }, [params.id])
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <div className="row">
            <div className="col-md-4">
                <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`} alt={actor.name}/>
            </div>
            <div className="col-md-8">
                <h1>{actor.name}</h1>
                <span>Дата рождения {actor.birthday?.split("-").reverse().join("/")}</span>
                <p>Место рождения {actor.place_of_birth}</p>
                <p>Пол {actor.gender === 1 ? "Женский" : actor.gender === 2 ? "Мужской" : "Неизвестно"}</p>
                <p>Также известность как {actor.also_known_as?.map(el =>
                    <span className="mx-2">{el}</span>)
                }
                </p>
                <p>Биография<br/>{actor.biography}</p>
                <p>Известность за {actor.known_for_department}</p>
                {
                    actor.homepage !== null && <Link src={actor.homepage}>Learn more about...</Link>
                }
            </div>
        </div>
    );
};

export default ActorInfo;