import React from 'react'
import { Link } from 'react-router-dom'
import './Results.css'
import btnback from '../../images/btn_back.svg'

export default function Results() {

    return (
        <div className='results'>
            <div className='results__content'>
                <h1 className='results__title'>Results</h1>
                <p className='results__subtitle'>Order basket redesing {/* {name} */}</p>
            </div>
            <Link 
                className='results__btn'
                to='/'
            ><img src={btnback} alt='button back'/>Back</Link>
        </div>
    )
}