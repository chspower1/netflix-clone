import React from "react";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Header from "./components/Header";
import Series from "./Routes/Series";
import Movie from "./Routes/Movie";
import { ContentWrap } from "./style/style";
function App() {
    return (
        <BrowserRouter>
            <Header />
            <ContentWrap>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies/:category/:movieId" element={<Home />} />
                    <Route path="/series" element={<Series />} />
                    <Route path="/movie" element={<Movie />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </ContentWrap>
        </BrowserRouter>
    );
}

export default App;
