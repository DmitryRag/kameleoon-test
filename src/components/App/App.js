import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Preloader from '../Preloader/Preloader'
import Results from '../Results/Results'
import Finalize from '../Finalize/Finalize'
import SearchForm from '../SearchForm/SearchForm'
import TableHeaders from '../TableHeaders/TableHeaders'
import Card from '../Card/Card'
import SearchFormError from '../SearchFormError/SearchFormError'
import './App.css'

export default function App() {
    const [tests, setTests] = useState([])
    const [directionSort, setDirectionSort] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [nameCard, setNameCard] = useState('')

    const getTests = async () => {
        axios.get(`http://localhost:3100/tests`)
            .then(res => {
                setTests(res.data)
            })
            .catch(error => {
                console.log(error, 'ошибка запроса')
            })
    }

    useEffect(() => {
        getTests()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 500)
    })

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

    function sortSiteData(field) {
        const copyData = tests.concat()
        let draftData = copyData.filter(item => item.siteId == 1)
        let noneDraftData = copyData.filter(item => item.siteId !== 1)
        let preSortData = noneDraftData.sort((a, b) => {
            return a[field] > b[field] ? 1 : -1
        })
        let sortData
        if (directionSort) {
            sortData = [...preSortData, ...draftData]
        } else {
            let reverseData = noneDraftData.reverse()
            sortData = [...draftData, ...reverseData]
        }
        setTests(sortData)
        setDirectionSort(!directionSort)
    }

    function setName(name) {
        setNameCard(name);
    }

    const filteredDashboard = tests.filter(tests => {
        return tests.name.toLowerCase().includes(searchValue.toLocaleLowerCase().trim())
    })

    function changeSearchInput(e) {
        setSearchValue(e.target.value)
    }

    function resetSearchForm(e) {
        e.preventDefault()
        setSearchValue('')
    }

    return (
        <div>
            <Routes>
                <Route path="results" element={<Results nameCard={nameCard}/>}>
                    <Route path=":testId" element={<Results />} />
                </Route> 
                <Route path="finalize" element={<Finalize nameCard={nameCard}/>}>
                    <Route path=":testId" element={<Finalize />} />
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
                                sortSiteData={sortSiteData}
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
                                setName={setName}
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