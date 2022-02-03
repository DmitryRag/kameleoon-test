import React from 'react'
import './SearchFormError.css'

export default function SearchFormError({ resetSearchForm }) {
    
    return (
        <div className='search-error'>
            <h2 className='search-error__title'>Your search did not match any results.</h2>
            <button className='search-error__btn' onClick={resetSearchForm}>Reset</button>
        </div>
    )
}