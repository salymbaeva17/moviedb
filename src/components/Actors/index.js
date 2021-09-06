import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from "axios";


const Actors = ({setActorsLoading}) => {
    const params = useParams()
    const history = useHistory()
    const [actors, setActors] = useState([])
    const getActors = () => {
        history.push(`/cast/${params.id}`)
    }
    useEffect(()=>{
        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?language=ru&sort_by=popularity.desc&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setActors(data.cast)
                setActorsLoading(false)

            })
    }, [params.id, setActorsLoading])
    return (
        <>
            <h3>В главных ролях</h3>
            <OwlCarousel className='owl-theme mt-3' items={7} loop={0} margin={10} dots={false}>
                {
                    actors.slice(0, 7).map(actor =>
                        <div key={actor.id}>
                            <Link to={`/actor/${actor.id}`}>
                                {actor.profile_path === null || actor.profile_path?.includes("null") ?
                                    actor.gender === 1 || actor.gender === 0 ?
                                        <>
                                            <img
                                                src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg"
                                                alt={actor.character}/>
                                            <span>{actor.character.split(" ").slice(0,2)}</span>
                                        </>
                                        :
                                        <>
                                            <img
                                                src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                                                alt={actor.character}/>
                                            <span>{actor.character.split(" ").slice(0,2)}</span>
                                        </> :
                                    <>
                                        <img
                                            src={`https://www.themoviedb.org/t/p/w276_and_h350_face${actor.profile_path}`}
                                            alt={actor.character.split(" ").slice(0,2)}/>
                                        <span>{actor.character}</span>
                                    </>
                                }
                            </Link>
                        </div>
                    )
                }
                <div>
                    <button className='btn-actors' onClick={getActors}>Смотреть ещё <i
                        className='bx bx-right-arrow-alt'/>
                    </button>
                </div>
            </OwlCarousel>

        </>
    );
};

export default Actors;