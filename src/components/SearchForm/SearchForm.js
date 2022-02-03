import React from 'react'
import searchlogo from '../../images/search_logo.svg'
import './SearchForm.css'

export default function SearchForm({value, onChange, filteredDashboard}) {
    
    return (
        <div>
            <form className='search-form'>
                <img className='search-form__logo' src={searchlogo} alt='search logo' />
                <input
                    className='search-form__input'
                    value={value}
                    onChange={onChange}
                />
                <p className='search-form__value'>{filteredDashboard.length} tests</p>
            </form>
        </div>
    )
}