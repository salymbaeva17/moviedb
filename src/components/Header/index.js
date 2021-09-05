import React from 'react';
import {Link} from "react-router-dom";
import {TMDB} from "../images";


const Header = () => {
    return (
        <header className="header">
            <div className="container header__container">
                <div className="header__left-side">
                    <div className="header__logo">
                        <TMDB viewBox="0 0 300 40" className="header__svg" />
                    </div>
                    <nav className="header__navbar">
                        <Link to="/" className="header__link">Фильмы</Link>
                        <Link className="header__link">Сериалы</Link>
                        <Link className="header__link">Люди</Link>
                        <Link className="header__link">Ещё</Link>
                    </nav>
                </div>
                <div className="header__right-side">
                    <i className="fas fa-plus"/>
                    <i className="fas fa-bell"/>
                    <i className="fas fa-search"/>
                </div>
            </div>
        </header>
    );
};

export default Header;