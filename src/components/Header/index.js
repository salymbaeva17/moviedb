import React, { useState} from 'react';
import {Link} from "react-router-dom";
import {TMDB} from "../images";
import SearchBar from "../SearchBar";


const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <header className="header">
            <div className="container header__container">
                <div className="header__left-side">
                    <Link to="/" className="header__logo">
                        <TMDB viewBox="0 0 300 40" className="header__svg"/>
                    </Link>
                    <nav className="header__navbar">
                        <Link to="/films" className="header__link">Фильмы</Link>
                        <Link to="/" className="header__link">Сериалы</Link>
                        <Link to="/" className="header__link">Люди</Link>
                        <Link to="/" className="header__link">Ещё</Link>
                    </nav>
                </div>
                <div className="header__right-side">
                    <Link to="/" className="header__link"><i className="fas fa-plus"/></Link>
                    <Link to="/" className="header__link"><i className="fas fa-bell"/></Link>
                    <button className="header__link--search" style={{transition: ".9s"}} onClick={()=> setIsOpen(true)}><i className="fas fa-search"/></button>
                </div>
            </div>
            {isOpen &&   <SearchBar setIsOpen={setIsOpen}/>}
        </header>
    );
};

export default Header;