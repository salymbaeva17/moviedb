import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

const SearchBar = ({setIsOpen}) => {
    const history = useHistory()
    const [inputValue, setInputValue] = useState("")
    const input = (e) => {
        setInputValue(e.target.value)
    }
    const handleClick = () => {
        history.push(`/search/${inputValue}`)
        setTimeout(() => setInputValue(""), 1000)
    }
    const handleClear = () => {

        setIsOpen(false)
    }
    const enterPress = (e) => {
        if (e.key === "Enter") {
            handleClick()
        }
    }
    return (

        <div className="search__bar">
            <div className="container d-flex justify-content-between align-items-center h-100">
                <>
                    <button className="search__btn d-flex justify-content-center align-items-center"
                            onClick={handleClick} disabled={!inputValue.trim()}>
                        <i className="fas fa-search"/>
                    </button>
                    <input type="text" className="search__input" placeholder="Найти фильм, сериал, персону..."
                           onKeyDown={enterPress} value={inputValue} onChange={input}/>
                </>
                <button className="search__btn d-flex justify-content-flex-end align-items-center" onClick={handleClear}>
                    <i className="fas fa-times"/>
                </button>
            </div>
        </div>

    );
};

export default SearchBar;