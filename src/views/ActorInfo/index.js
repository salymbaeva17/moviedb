import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import Spinner from "../../components/Spinner";
import OwlCarousel from "react-owl-carousel";

const ActorInfo = () => {
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [actor, setActor] = useState({})
    const [acting, setActing] = useState([])
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${params.id}?language=ru&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setActor(data)
                setIsLoading(false)
            })
        axios(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?language=ru&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setActing(data.cast)
            })

    }, [params.id])
    const releaseDate = acting.filter(el => el.release_date).sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <div className="row">
            <div className="col-md-4">
                <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`} alt={actor.name}/>
                <h3>Персональная информация</h3>
                <p>Известность за {actor.known_for_department}</p>
                <p>Пол {actor.gender === 1 ? "Женский" : actor.gender === 2 ? "Мужской" : "Неизвестно"}</p>
                <span>Дата рождения {actor.birthday?.split("-").reverse().join(".")}</span>
                <p>Место рождения {actor.place_of_birth}</p>
                {
                    actor.also_known_as &&
                        <>
                            <h4>Также известность как</h4>
                            {actor.also_known_as?.map((el, idx) =>
                                <p key={idx}>{el}</p>)
                            }
                        </>

                }

            </div>
            <div className="col-md-8">
                <h1>{actor.name}</h1>
                <p>Биография<br/>{actor.biography}</p>
                <h4>Известность за</h4>
                <OwlCarousel className="d-flex" items={7}>
                    {
                        acting.filter(el => el.popularity > 7).map(item =>
                            <div className="mx-2">
                                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} alt=""/>
                                    <p>{item.title}</p>
                            </div>
                        )
                    }
                 </OwlCarousel>
                <div>
                    <h4>Актерское искусство</h4>
                    {
                        acting.filter(el => !el.release_date).map(item =>
                            <div key={item.id}>
                                <span  className='me-5'>－</span>
                                <Link  to={`/film/${item.id}`} className="ms-3">{item.title}</Link>
                                { item.character &&
                                    <>
                                        <span className="mx-2">как</span>
                                        <span>{item.character}</span>
                                    </>

                                }

                            </div>


                        )
                    }
                    {
                        releaseDate.map(item =>
                            <div key={item.id} className="d-flex">
                                <span className='me-5'>{item.release_date.slice(0, 4)}</span>
                                <Link to={`/film/${item.id}`}>{item.title}</Link>
                                { item.character &&
                                <>
                                    <span className="mx-2">как</span>
                                    <span>{item.character}</span>
                                </>

                                }
                            </div>
                        )
                    }
                </div>

            </div>

        </div>
    );
};

export default ActorInfo;