import React from 'react'
import './TableHeaders.css'

export default function TableHeaders({sortData, sortStatusData, sortSiteData}) {
    return (
        <div>
            <div className='table-headers'>
                <div className='table-header__name' onClick={() => { sortData('name') }}><p>NAME</p></div>
                <div className='table-header__type' onClick={() => { sortData('type') }}>TYPE</div>
                <div className='table-header__status' onClick={() => { sortStatusData('status') }}>STATUS</div>
                <div className='table-header__url' onClick={() => { sortSiteData('siteId') }}>SITE</div>
            </div>
        </div>
    )
}