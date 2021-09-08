import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

const SearchBar2 = () => {
    const history = useHistory()

    const [inputValue, setInputValue] = useState("")
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
        <div className="home__search-bar">
            <input type="text" onKeyDown={enterPress} onChange={input} value={inputValue} className="home__input" placeholder="Найти фильм, сериал, персону......"/>
            <button onClick={handleClick} disabled={!inputValue.trim()} className="home__search-btn">Search</button>
        </div>
    );
};

export default SearchBar2;