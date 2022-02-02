import React from 'react'
import './TableHeaders.css'

export default function TableHeaders({sortData, sortStatusData}) {
    return (
        <div>
            <div className='table-headers'>
                <div className='table-header__name' onClick={() => { sortData('name') }}>NAME</div>
                <div className='table-header__type' onClick={() => { sortData('type') }}>TYPE</div>
                <div className='table-header__status' onClick={() => { sortStatusData('status') }}>STATUS</div>
                <div className='table-header__url' onClick={() => { sortData('site') }}>SITE</div>
            </div>
        </div>
    )
}