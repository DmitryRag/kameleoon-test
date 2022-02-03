import React from 'react'
import { Link } from 'react-router-dom'
import btnback from '../../images/btn_back.svg'
import './Finalize.css'

export default function Finalize({nameCard}) {

    return (
        <div className='finalize'>
            <div className='finalize__content'>
                <h1 className='finalize__title'>Finalize</h1>
                <p className='finalize__subtitle'>{nameCard}</p>
            </div>
            <Link className='finalize__btn' to='/'>
                <img className='finalize__btn_img' src={btnback} alt='button back'/><p className='finalize__btn_text'>Back</p>
            </Link>
        </div>
    )
}