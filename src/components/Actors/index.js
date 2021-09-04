import React from 'react';
import {Link} from "react-router-dom";

const Actors = ({actors}) => {
    return (
        <>
            <h3>В главных ролях</h3>
            {
                actors.filter(el => el.order <= 9).map(actor =>
                    <div key={actor.id} className="col-sm-2">
                        <Link to={`/actor/${actor.id}`}>
                            {actor.profile_path === null || actor.profile_path?.includes("null") ?
                                actor.gender === 1 || actor.gender === 0 ?
                                    <>
                                        <img
                                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg"
                                            alt="user-grey"/>
                                        <h5>{actor.name}</h5>
                                        <span>{actor.character}</span>
                                    </>
                                    :
                                    <>
                                        <img
                                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                                            alt="user-grey"/>
                                        <h5>{actor.name}</h5>
                                        <span>{actor.character}</span>
                                    </> :
                                <>
                                    <img src={`https://www.themoviedb.org/t/p/w276_and_h350_face${actor.profile_path}`}
                                         alt={actor.name}/>
                                    <h5>{actor.name}</h5>
                                    <span>{actor.character}</span>
                                </>
                            }
                        </Link>

                    </div>
                )
            }

        </>
    );
};

export default Actors;