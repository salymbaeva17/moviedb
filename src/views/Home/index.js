import {useHistory, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

const Home = () => {
    const history = useHistory()
    const [inputValue, setInputValue] = useState("")
    const [page, setPage] = useState(1)
    const [films, setFilms] = useState([])
    const [search, setSearch] = useState({})
    const params = useParams()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/search/multi?query=${params.name}&page=${page}&language=ru&api_key=8bd09535ee32769ac84638efb6c3cfe5`)
            .then(({data}) => {
                setSearch(data)
            })
    }, [page, params.name])
    const input = (e) => {
        setInputValue(e.target.value)
    }
    const handleClick = () => {
        history.push(`/search/${inputValue}`)
        setTimeout(() => setInputValue(""), 1000)
    }
    const enterPress = (e) => {
        if (e.key === "Enter") {
            handleClick()
        }
    }
    return (
        <>
            <div className="home__backdrop"/>
            <div className="home">
                <div className="container">
                    <h1 className="home__title">Добро пожаловать.</h1>
                    <h3 className="home__subtitle">Миллионы фильмов, сериалов и людей. Исследуйте сейчас.</h3>
                    <div className="home__search-bar">
                        <input type="text" onKeyDown={enterPress} onChange={input} value={inputValue} className="home__input" placeholder="Найти фильм, сериал, персону......"/>
                        <button onClick={handleClick} disabled={!inputValue.trim()} className="home__search-btn">Search</button>
                    </div>

                </div>
            </div>
        </>

    );
};

export default Home;