import React from 'react';

const PagePicker = ({page, setPage}) => {
    const handlePage = (item) => {
        setPage(item)
    }
    return (
        <>
            {
                [...Array(6).keys()].map(item =>
                    <button key={item} className={`btn page__btn-primary mx-1 ${page === item + 1 && `page__btn-info text-white`}`} type="button" onClick={() => handlePage(item + 1)}>{item + 1}</button>
                )
            }
        </>
    );
};

export default PagePicker;