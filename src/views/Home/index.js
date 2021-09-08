
import SearchBar2 from "../../components/SearchBar2";

const Home = () => {
    return (
        <>
            <div className="home__backdrop"/>
            <div className="home">
                <div className="container">
                    <h1 className="home__title">Добро пожаловать.</h1>
                    <h3 className="home__subtitle">Миллионы фильмов, сериалов и людей. Исследуйте сейчас.</h3>
                 <SearchBar2 />
                </div>
            </div>
        </>

    );
};

export default Home;