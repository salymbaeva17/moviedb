import React from 'react';

const PagePicker = ({page, setPage}) => {
    const handlePage = (item) => {
        setPage(item)
    }
    return (
        <div className="page__picker">
            {
                [...Array(6).keys()].map(item =>
                    <button key={item} className={`btn page__btn-primary me-2 ${page === item + 1 && `page__btn-info text-white`}`} type="button" onClick={() => handlePage(item + 1)}>{item + 1}</button>
                )
            }
        </div>
    );
};

export default PagePicker;