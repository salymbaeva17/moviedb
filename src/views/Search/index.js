import {useEffect, useState} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";


const Search = () => {
    const [search, setSearch] = useState({})
    const [page, setPage] = useState(1)
    const params = useParams()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/search/multi?query=${params.name}&page=${page}&language=ru&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setSearch(data)
            })
    }, [page, params.name])
    let pageButtons = ""
    if (search.total_pages > 1 && page === 1) {
        pageButtons = (<button className='page__btn' onClick={() => setPage(page + 1)}><i className="fas fa-arrow-circle-right"/></button>)
    } else if (search.total_pages > page && page > 1) {
        pageButtons = (<>
            <button className='page__btn' onClick={() => setPage(page - 1)}>
                <i className="fas fa-arrow-circle-left"/></button>
            <button className='page__btn' onClick={() => setPage(page + 1)}>
                <i className="fas fa-arrow-circle-right"/></button>
        </>)
    } else if (search.total_pages === page && page !== 1) {
        pageButtons = (<button className='page__btn' onClick={() => setPage(page - 1)}><i className="fas fa-arrow-circle-left"/></button>)
    }
    return (
        <>
            <div className="container margin-top">
                <div className="row mt-5">
                    {search.results?.length ?
                        <>
                            {
                                search.results?.map(result =>
                                    <div className="col-md-6 mb-4 link">
                                        <Link to={`/film/${result.id}`} className="search__film-box">
                                            {result.poster_path ? <img className="search__film-image"
                                                                       src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2${result.poster_path}`}
                                                                       alt={result.title?.slice(0, 2)}/> :
                                                <img className="search__film-image"
                                                     style={{objectFit: "contain", backgroundColor: "#032542"}}
                                                     src={`https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png`}
                                                     alt={result.title?.slice(0, 2)}/>
                                            }
                                            <div
                                                className="search__film-short-info d-flex flex-column justify-content-center ms-3">
                                                <h2 className="search__film-title">{result.title}</h2>
                                                <p className="search__film-release">{result.release_date?.split("-").reverse().join(".")}</p>
                                                {
                                                    result.overview ?
                                                        ((result.overview).length > 120) ?
                                                            <p className="search__film-overview">{((result.overview).substring(0, 120 - 3)) + '...'}</p> :
                                                            <p className="search__film-overview">{result.overview}</p> : ""
                                                }
                                            </div>
                                        </Link>
                                    </div>)
                            }
                        </>

                        : <div className="d-flex justify-content-center fs-3">Такого фильма нет :(</div>
                    }
                    <div className="page__btn-box">{pageButtons}</div>
                </div>
            </div>
        </>
    );
};


export default Search