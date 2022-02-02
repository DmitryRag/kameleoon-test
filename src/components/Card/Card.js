import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import './Card.css'

export default function Card({ name, type, status, siteId, key, id }) {

    var url
    if (siteId === 1) {
        url = 'market.company.com'
    } else if (siteId === 2) {
        url = 'delivery.company.com'
    } else {
        url = 'games.company.com'
    }

    var types = type
    if (type !== 'MVT') {
        types = types.charAt(0) + types.substring(1).toLowerCase().replace('_', '-')
    } else {
        types = type
    }

    var statuses = status.charAt(0) + status.substring(1).toLowerCase()

    const cardClass = classNames(
        'card', {
            card__border_1: siteId === 1,
            card__border_2: siteId === 2,
            card__border_3: siteId === 3,
        }
    )

    const btnClass = classNames(
        'card__btn', {
            card__btn_grey: statuses === 'Draft',
            card__btn_green: statuses !== 'Draft',
        }
    )

    const statusClass = classNames(
        'card__status', {
            card__status_online: statuses === 'Online',
            card__status_paused: statuses === 'Paused',
            card__status_stopped: statuses === 'Stopped',
            card__status_draft: statuses === 'Draft'
        }
    )

    return (
        <div className={cardClass}>
            <div className='card__name'>{name}</div>
            <div className='card__type'>{types}</div>
            <div className={statusClass}>{statuses}</div>
            <div className='card__url'>{url}</div>
            <Link
            className={btnClass}
            to={`/results/${id}`}
            key={id}
            />
        </div>

    )
}
