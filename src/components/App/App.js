import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Card from '../Card/Card'
import Preloader from '../Preloader/Preloader'
import SearchForm from '../SearchForm/SearchForm'
import SearchFormError from '../SearchFormError/SearchFormError'
import TableHeaders from '../TableHeaders/TableHeaders'
import Results from '../Results/Results'
import Finalize from '../Finalize/Finalize'
import './App.css'
import { testss } from '../data'

export default function App() {
    const [sites, setSites] = useState([])
    const [tests, setTests] = useState(testss)
    const [directionSort, setDirectionSort] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

    const getSites = async () => {
        axios.get(`http://localhost:3100/sites`)
            .then(res => {
                setSites(res.data)
            })
            .catch(error => {
                console.log(error, 'ошибка запроса')
            })
    }

    /* const getTests = async () => {
        axios.get(`http://localhost:3100/tests`)
            .then(res => {
                setTests(res.data)
            })
            .catch(error => {
                console.log(error, 'ошибка запроса')
            })
    } */

    function sortData(field) {
        const copyData = tests.concat()
        let sortData
        if (directionSort) {
            sortData = copyData.sort((a, b) => {
                return a[field] > b[field] ? 1 : -1
            })
        } else {
            sortData = copyData.reverse((a, b) => {
                return a[field] > b[field] ? 1 : -1
            })
        }
        setTests(sortData)
        setDirectionSort(!directionSort)
    }

    function sortStatusData(field) {
        const copyData = tests.concat()
        let draftData = copyData.filter(item => item.status == "DRAFT")
        let noneDraftData = copyData.filter(item => item.status !== "DRAFT")
        let preSortData = noneDraftData.sort((a, b) => {
            return a[field] > b[field] ? 1 : -1
        })
        let sortData
        if (directionSort) {
            sortData = [...preSortData, ...draftData]
        } else {
            sortData = [...draftData, ...preSortData]
        }
        setTests(sortData)
        setDirectionSort(!directionSort)
    }

    const filteredDashboard = tests.filter(tests => {
        return tests.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
    })

    function changeSearchInput(e) {
        setSearchValue(e.target.value)
    }

    function resetSearchForm(e) {
        e.preventDefault()
        setSearchValue('')
    }

    useEffect(() => {
        getSites()
        /* getTests() */
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 500)
    })

    return (
        <div>
            <Routes>
                <Route path="results" element={<Results />}>
                    <Route path=":invoiceId" element={<Results data={tests}/>} />
                </Route>  
                <Route path='/' element={
                    <div className='App'>
                        <h1 className='app__title'>Dashboard</h1>
                        <SearchForm
                            value={searchValue}
                            onChange={changeSearchInput}
                            filteredDashboard={filteredDashboard}
                        />
                        {!isLoaded && (<Preloader />)}
                        {isLoaded && (filteredDashboard.length >= 1 ? (
                            <TableHeaders
                                sortData={sortData}
                                sortStatusData={sortStatusData}
                            />
                        ) : (
                            null
                        ))}
                        {isLoaded && (filteredDashboard.map(tests =>
                            <Card
                                name={tests.name}
                                type={tests.type}
                                status={tests.status}
                                siteId={tests.siteId}
                                key={tests.id}
                                id={tests.id}
                            />
                        ))}
                        {isLoaded && (filteredDashboard.length < 1 &&
                            <SearchFormError
                                resetSearchForm={resetSearchForm}
                            />
                        )}
                    </div>}
                />


                  

            </Routes>
        </div>
    )
}