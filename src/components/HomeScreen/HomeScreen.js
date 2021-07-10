import React from 'react'
import "./HomeScreen.css"

import Nav from '../Navbar/Nav'
import Banner from '../Banner/Banner'
import requests from '../../api/request'
import Row from '../Row/Row'

export default function HomeScreen() {
    return (
        <div className="homeScreen">
            <Nav />
            <Banner />
            <Row
                title="NETFLIX ORIGINALS"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row
                title="Trending Now"
                fetchUrl={requests.fetchTrending}
            />
            <Row
                title="Top Rated"
                fetchUrl={requests.fetchTopRated}
            />
            <Row
                title="Action Movies"
                fetchUrl={requests.fetchActionMovies}
            />
            <Row
                title="Horror Movies"
                fetchUrl={requests.fetchHorrorMovies}
            />
            <Row
                title="Comedy Movies"
                fetchUrl={requests.fetchComdeyMovies}
            />
            <Row
                title="Romance Movies"
                fetchUrl={requests.fetchRomanceMovies}
            />
            <Row
                title="Documentaries"
                fetchUrl={requests.fetchDocumentaries}
            />
        </div>
    )
}