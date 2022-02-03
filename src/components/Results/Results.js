import React from 'react'
import { Link } from 'react-router-dom'
import btnback from '../../images/btn_back.svg'
import './Results.css'

export default function Results({nameCard}) {

    return (
        <div className='results'>
            <div className='results__content'>
                <h1 className='results__title'>Results</h1>
                <p className='results__subtitle'>{nameCard}</p>
            </div>
            <Link className='results__btn' to='/'>
                <img className='results__btn_img' src={btnback} alt='button back'/><p className='results__btn_text'>Back</p>
            </Link>
        </div>
    )
}