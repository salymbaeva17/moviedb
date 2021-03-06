import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import Spinner from "../../components/Spinner";
import OwlCarousel from "react-owl-carousel";

const ActorInfo = () => {
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [filmLoading, setFilmLoading] = useState(true)
    const [actor, setActor] = useState({})
    const [acting, setActing] = useState([])

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${params.id}?language=ru&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setActor(data)
                setIsLoading(false)
            })
    }, [params.id])
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setActing(data.cast)
                setFilmLoading(false)
            })
    }, [params.id])
    console.log(new Date().getFullYear())
    const releaseDate = acting.filter(el => el.release_date).sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    if (isLoading || filmLoading) {
        return <Spinner/>
    }
    return (
        <div className="row">
            <div className="col-md-4">
                {actor.profile_path === null || actor.profile_path?.includes("null") ?
                    actor.gender === 1 ?
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
                <h3>???????????????????????? ????????????????????</h3>
                <p>?????????????????????? ????: {actor.known_for_department}</p>
                <p>??????: {actor.gender === 1 ? "??????????????" : actor.gender === 2 ? "??????????????" : "????????????????????"}</p>
                <span>???????? ????????????????: {actor.birthday?.split("-").reverse().join(".")}</span>
                <p className="max-width">?????????? ????????????????: {actor.place_of_birth}</p>
                {
                    actor.also_known_as &&
                    <>
                        {
                            actor.gender === 1 ? <h4>?????????? ???????????????? ??????</h4> : actor.gender === 2 ?
                                <h4>?????????? ???????????????? ??????</h4> : <h4>?????????? ???????????????? ??????</h4>
                        }
                        {actor.also_known_as?.map((el, idx) =>
                            <p key={idx}>{el}</p>)
                        }
                    </>
                }
            </div>
            <div className="col-md-8">
                <h1>{actor.name}</h1>
                <p>??????????????????<br/>{actor.biography}</p>
                <h4>?????????????????????? ????</h4>
                <OwlCarousel className="d-flex" items={6} margin={8}>
                    {
                        acting.sort((a, b) => b.vote_count - a.vote_count).map(item =>
                            <div key={item.id} className="actor__box--2">
                                <Link className="actor__link" to={`/film/${item.id}`}>
                                    <img className="actor__image"
                                         src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
                                         alt=""/>
                                    <p className="actor__name">{item.title}</p>
                                </Link>
                            </div>
                        ).slice(0, 9)
                    }
                </OwlCarousel>
                <div>
                    <h4 className="mt-4">?????????????????? ??????????????????</h4>
                    {
                        acting.filter(el => !el.release_date).map(item =>
                            <div key={item.id}>
                                <span className='me-5'>???</span>
                                <Link to={`/film/${item.id}`} className="ms-3 actor__name2">{item.title}</Link>
                                {item.character &&
                                <>
                                    <span className="mx-2">??????</span>
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
                                <Link to={`/film/${item.id}`} className="actor__name2">{item.title}</Link>
                                {item.character &&
                                <>
                                    <span className="mx-2">??????</span>
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